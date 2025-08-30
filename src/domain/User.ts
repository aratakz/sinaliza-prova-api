import { Student } from "../models/entity/Studant";
import { User } from "../models/entity/User";
import { UserRepository } from "../repository/UserRepository";
import { EmailService } from "../services/EmailService";
import { ExitentRecordException } from "./exception/ExistentRecordException";
import { MetadataExecption } from "./exception/MetadataException";
import {TwoFactorTokenRepository} from "../repository/TwoFactorTokenRepository";
import { ulid } from "ulid";
import moment from "moment";


type Email = {
    title: string,
    from: string,
    to: string,
    subject: string,
    text?: string,
    html?: string
}

export class UserDomain {

    private usersRepository;

    constructor() {
        this.usersRepository = new UserRepository();
    }


    async createStudent(studentMetadata: Student) {
        if (await this.usersRepository.findByUserName(studentMetadata.username)) {
            throw new ExitentRecordException();
        }
        if (studentMetadata.confirmPassword != studentMetadata.password) {
            throw new MetadataExecption("Password not metch");
        }

        const student = new Student();
        await student.setPassword(studentMetadata.password);
        student.birthday = new Date(studentMetadata.birthday)
        student.email = studentMetadata.email;
        student.name = studentMetadata.name
        student.username = studentMetadata.username;
        student.avatarLink = '';
        const authTokenRepository = new TwoFactorTokenRepository();
        const tempUlid = ulid();
        await this.usersRepository.save(student);

        await authTokenRepository.save({
            user: student,
            token: tempUlid,
            expiration: new Date(moment().add(5, 'minutes').toDate())
        });
        const email: Email = {
            from: "server@email.com",
            to: student.email,
            subject: "Seu cadastro no Sinaliza Prova foi criado!",
            title: "Acesso a plataforma Sinaliza prova",
            text: "Olá, voce acaba de se cadastrar no Sinaliza prova. Para concluir o seu cadastro, basta acessar o link abaixo!"
        }
        const emailService = new EmailService(email, 'activation', [{
            studentName: student.name,
            activationLink: `http://localhost:4200/auth/activate/${tempUlid}`,
        }]);
        await emailService.sendEmail();
    }

    async update(user: User, userData: any) {
        user.username = userData.username;
        user.email = userData.email;
        if (userData.password) {
            await user.setPassword(userData.password);
        }
        if (user instanceof Student) {
            user.birthday = userData.birthday
        }
        this.usersRepository.save(user);
    }
}
import { Student } from "../models/entity/Studant";
import { User } from "../models/entity/User";
import { UserRepository } from "../repository/UserRepository";
import { EmailService } from "../services/EmailService";
import { ExitentRecordException } from "./exception/ExistentRecordException";
import { MetadataExecption } from "./exception/MetadataException";

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


    async createSudant (studentMetadata: Student) {
        if (await this.usersRepository.findByUserName(studentMetadata.username)) {
            throw new ExitentRecordException();
        }
        if (studentMetadata.confirmPassword != studentMetadata.password) {
            throw new MetadataExecption("Password not metch");
        }
        
        const studant = new Student();
        await studant.setPassword(studentMetadata.password); 
        studant.birthday = new Date(studentMetadata.birthday)
        studant.email = studentMetadata.email;
        studant.name = studentMetadata.name
        studant.username = studentMetadata.username;
        studant.avatarLink = '';

        await this.usersRepository.save(studant);
        const email: Email = {
            from: "server@email.com",
            to: studant.email,
            subject: "Seu cadastro no Sinaliza Prova foi criado!",
            title: "Acesso a plataforma Sinaliza",
            text: "Olá, voce acaba de se cadastrar no Sinaliza prova. Para concluir o seu cadastro, basta acessar o link abaixo!"
        }
        const emailService = new EmailService(email, 'activation', [{
            studentName: studant.name,
            activationLink: 'https://github.com',
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
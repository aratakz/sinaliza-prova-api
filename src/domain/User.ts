import {Discipline, Student} from "../models/entity";
import { User } from "../models/entity";
import { UserRepository } from "../repository/UserRepository";
import { MetadataExecption } from "./exception/MetadataException";
import {InstituteRepository} from "../repository/InstituteRepository";
import {StudentDTO} from "../dto/StudentDTO";
import {InstituteDomain} from "./InstituteDomain";
import {DisciplineDomain} from "./Disclipline";


type Email = {
    title: string,
    from: string,
    to: string,
    subject: string,
    text?: string,
    html?: string
}

export class UserDomain {

    private usersRepository: UserRepository;
    private instituteRepository: InstituteRepository;

    constructor() {
        this.usersRepository = new UserRepository();
        this.instituteRepository = new InstituteRepository();
    }


    async createStudent(token: string, studentMetadata: StudentDTO) {
        const instituteDomain: InstituteDomain = new InstituteDomain();
        const institute= await instituteDomain.getByToken(token);
        if (!institute) {
            throw new MetadataExecption('Institute not found!');
        }

        const student = new Student();
        student.cpf = studentMetadata.cpf;
        student.birthday = new Date(studentMetadata.birthday)
        student.email = studentMetadata.email;
        student.name = studentMetadata.name
        student.institute = institute;

        if (studentMetadata.disciplines) {
            const disciplineDomain: DisciplineDomain = new DisciplineDomain();
            let disciplieList: Discipline[] = [];
            for (const disciplineMetadata of studentMetadata.disciplines) {
                if (!disciplineMetadata.value) {
                    throw new MetadataExecption('Discipline if not provided!');
                }
                const discipline = await disciplineDomain.findOne(disciplineMetadata.value);
                if (!discipline) {
                    throw new MetadataExecption('Discipline not found!');
                }
               disciplieList.push(discipline);
            }
            student.disciplines = disciplieList;
        }
        await this.usersRepository.save(student);

        // const authTokenRepository = new TwoFactorTokenRepository();
        // const tempUlid = ulid();

        // const email: Email = {
        //     from: "server@email.com",
        //     to: student.email,
        //     subject: "Seu cadastro no Sinaliza Prova foi criado!",
        //     title: "Acesso a plataforma Sinaliza prova",
        //     text: "Olá, voce acaba de se cadastrar no Sinaliza prova. Para concluir o seu cadastro, basta acessar o link abaixo!"
        // }
        // const emailService = new EmailService(email, 'activation', [{
        //     studentName: student.name,
        //     activationLink: `http://localhost:4200/auth/activate/${tempUlid}`,
        // }]);
        // await emailService.sendEmail();
    }

    async updateStudent(studentId: string, studentMetadata: StudentDTO) {
        const student = await this.usersRepository.findById(studentId);
        if (!student) {
            throw new Error('Student not found!');
        }

        if (student instanceof Student) {
            student.name = studentMetadata.name;
            student.cpf = studentMetadata.cpf;
            student.birthday = new Date(studentMetadata.birthday);
            student.email = studentMetadata.email;
           await this.usersRepository.save(student);
        } else {
            throw new Error('Student not found!');
        }
    }

    async getStudents(): Promise<Student[]> {
        return await this.usersRepository.findStudents();
    }

    async remove (userId: string): Promise<void> {
        const student = await this.usersRepository.findById(userId);
        if (!student) {
            throw new Error('User not found!');
        }
        if (student instanceof Student) {
            await this.usersRepository.removeStudant(student);
        } else {
            throw new Error('User not found!');
        }
    }

    async getStudent(userId: string): Promise<User|Student> {
        const student = await this.usersRepository.findById(userId);
        if (!student) {
            throw new Error('User not found!');
        }
        return student;
    }
}
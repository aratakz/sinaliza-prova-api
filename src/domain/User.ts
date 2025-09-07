import { User, Discipline, Room, Student, Professional} from "../models/entity";
import { UserRepository } from "../repository/UserRepository";
import { MetadataExecption } from "./exception/MetadataException";
import {InstituteRepository} from "../repository/InstituteRepository";
import {StudentDTO} from "../dto/StudentDTO";
import {InstituteDomain} from "./InstituteDomain";
import {DisciplineDomain} from "./Disclipline";
import { ExitentRecordException } from "./exception/ExistentRecordException";
import { RoomDomain } from "./Room";
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
            student.disciplines = await this.addDisciplines(studentMetadata);
        }
        await this.usersRepository.save(student);
    }


    async createProfessional (professionalMetadata: Professional) {
        if (await this.usersRepository.findByUsername(professionalMetadata.username)) {
            throw new ExitentRecordException();
        }
        if (professionalMetadata.confirmPassword != professionalMetadata.password) {
            throw new MetadataExecption("Password not metch");
        }

        const professional = new Professional();
        await professional.setPassword(professionalMetadata.password);
        professional.email = professionalMetadata.email;
        professional.name = professionalMetadata.name;
        professional.username = professionalMetadata.username;
        professional.cpf = professionalMetadata.cpf;
        professional.accessProfile = professionalMetadata.accessProfile;
        professional.avatarLink = '';

        await this.usersRepository.save(professional);
    }

    async updateStudent(studentId: string, studentDTO: StudentDTO) {
        const student = await this.usersRepository.findStudentById(studentId);

        if (!student) {
            throw new Error('Student not found!');
        }


        student.name = studentDTO.name;
        student.cpf = studentDTO.cpf;
        student.birthday = moment(studentDTO.birthday).toDate();
        student.email = studentDTO.email;

        if (studentDTO.disciplines) {
            student.disciplines = await this.addDisciplines(studentDTO);
        }

        if (studentDTO.selectedRoom) {
            const roomDomain = new RoomDomain();
            const room: Room = await roomDomain.findById(studentDTO.selectedRoom);

            if (!room) {
                throw new Error("Room not found!");
            }

            student.room = room;
        } else {
            if (student.room) {
                student.room = null
            }
        }

        await this.usersRepository.save(student);

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
            await this.usersRepository.removeStudent(student);
        } else {
            throw new Error('User not found!');
        }
    }

    async getStudent(userId: string): Promise<User|Student> {
        const student = await this.usersRepository.findStudentById(userId);
        if (!student) {
            throw new Error('User not found!');
        }
        return student;
    }

    async getStudentByCPF(cpf:string) {
        return await this.usersRepository.findStudentByCPF(cpf);
    }
    
    private async addDisciplines(studentMetadata: StudentDTO): Promise<Discipline[]> {
        const disciplineDomain: DisciplineDomain = new DisciplineDomain();
        let disciplineList: Discipline[] = [];
        for (const disciplineMetadata of studentMetadata.disciplines) {
            if (!disciplineMetadata.value) {
                throw new MetadataExecption('Discipline if not provided!');
            }
            const discipline = await disciplineDomain.findOne(disciplineMetadata.value);
            if (!discipline) {
                throw new MetadataExecption('Discipline not found!');
            }
            disciplineList.push(discipline);
        }
        return disciplineList;
    }
}
import {Discipline, Room, Student} from "../../models/entity";
import { User } from "../../models/entity";
import { UserRepository } from "../../repository/UserRepository";
import { MetadataExecption } from "../exception/MetadataException";
import {InstituteRepository} from "../../repository/InstituteRepository";
import {StudentDTO} from "../../dto/StudentDTO";
import {InstituteDomain} from "../management/InstituteDomain";
import {DisciplineDomain} from "../Disclipline";
import {RoomDomain} from "../Room";
import moment from "moment";
import {UpdateUserDTO} from "../../dto/UpadateUserDTO";
import {S3Service} from "../../services/S3Sevice";
import {AccessLevel} from "../../models/enums";


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
    private S3Service: S3Service;

    constructor() {
        this.usersRepository = new UserRepository();
        this.S3Service = new S3Service();
    }


    async getUserByCPF(cpf:string) {
        return await this.usersRepository.findStudentByCPF(cpf);
    }
    async updateUser(userId: string, updateUserDTO: UpdateUserDTO) {
        const user = await this.usersRepository.findById(userId);

        if (!user) {
            throw new MetadataExecption('User not found!');
        }
        await user.addRegisterData(updateUserDTO);

        if (updateUserDTO.image) {
            await user.updateAvatar(updateUserDTO.image);
        }

        await this.usersRepository.save(user);
    }
    async getAvatar(avatarLink: string) {
        return this.S3Service.getImage(avatarLink);
    }


    async createStudent(token: string, studentMetadata: StudentDTO) {
        const instituteDomain: InstituteDomain = new InstituteDomain();
        const cpfOwner = await this.getUserByCPF(studentMetadata.cpf);

        if (cpfOwner) {
            throw new Error('CPF unavailable');
        }

        const student = new Student();
        student.cpf = studentMetadata.cpf;
        student.birthday = new Date(studentMetadata.birthday)
        student.email = studentMetadata.email;
        student.name = studentMetadata.name
        student.accessLevel = AccessLevel.STUDENT.toString();
        if (studentMetadata.disciplines) {
            student.disciplines = await this.addDisciplines(studentMetadata);
        }
        await this.usersRepository.save(student);
    }
    async updateStudent(studentId: string, studentDTO: StudentDTO) {
        const student = await this.usersRepository.findStudentById(studentId);
        if (!student) {
            throw new Error('Student not found!');
        }
        const cpfOwner = await this.getUserByCPF(studentDTO.cpf);
        if (cpfOwner && cpfOwner.cpf !== student.cpf) {
            throw new Error('CPF unavailable');
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
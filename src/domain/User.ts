import { Student } from "../models/entity/Studant";
import { UserRepository } from "../repository/UserRepository";
import { ExitentRecordException } from "./exception/ExistentRecordException";
import { MetadataExecption } from "./exception/MetadataException";


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
        await this.usersRepository.save(studant);
    }

}
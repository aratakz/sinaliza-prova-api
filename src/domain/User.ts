import { Student } from "../models/entity/Studant";
import { UserRepository } from "../repository/UserRepository";


export class UserDomain {

    private usersRepository;

    constructor() {
        this.usersRepository = new UserRepository();
    }


    async createSudant (studentMetadata: Student) {
        const studant = new Student(); 
        await studant.setPassword(studentMetadata.password);
        studant.username = studentMetadata.username;
        await this.usersRepository.save(studant);
    }

}
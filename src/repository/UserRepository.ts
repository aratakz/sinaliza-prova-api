import { User } from "../models/entity/User";
import { RepositoryInterface } from "./RepositoryInterface";
import databaseConfig from "../server/typeorm.conf";
import { Student } from "../models/entity/Studant";
import { Professional } from "../models/entity";

export class UserRepository implements RepositoryInterface<User|null|Student>{
    
    async save(entity: User): Promise<void> {
        try {
            await databaseConfig.getRepository(User).save(entity);
        } catch(error) {
            console.log("ERRO" + error)
        }
    }
    
    async findById(id: string): Promise<User|Student|null> {
        const user = await databaseConfig.getRepository(User).find({
            where: {
                id: id
            },
            relations: {
                disciplines: true,
            },
        });
        if (user) {
            return user[0];
        }
        return null;
    }

    async findStudentById(id: string): Promise<Student> {
        const result = await databaseConfig.getRepository(Student).find({
            where: {
                id: id
            },
            relations: {
                disciplines: true,
                room: true
            },
        });
        return result[0];
    }
    
    async findAll(): Promise<User[]> {
        return await databaseConfig.getRepository(User).find();
    }

    async findByUsername(userName: string): Promise<User|null> {
        const user:User|null = await databaseConfig.getRepository(User).findOneBy({
            username: userName,
        });

        if (user) {
            return user;
        }
        return null;
    }

    async findByEmail(email: string): Promise<User|null> {
        const user:User|null = await databaseConfig.getRepository(User).findOneBy({
            email: email,
        });

        if (user) {
            return user;
        }
        return null;
    }

    async remove(entity: User): Promise<void> {
        try {
            let user = await this.findById(entity.id!);
            user!.active = false;
        } catch (error) {
            console.log("ERRO" + error)
        }
    }

    async findStudents() {
        return await databaseConfig.getRepository(Student).find({
            relations:{
                disciplines: true,
                room: true
            }
        });
    }

    async removeStudent(student: Student): Promise<void> {
        await databaseConfig.getRepository(Student).remove(student);
    }
    
    async findStudentByCPF(cpf: string) {
        const result = await databaseConfig.getRepository(Student).find({
            where: {
                cpf: cpf
            },
            relations: {
                institute: true,
            }
        });
        return result[0];
    }
    async findUserByCPF(cpf: string) {
        const result = await databaseConfig.getRepository(User).find({
            where: {
                cpf: cpf
            },
            relations: {
                institute: true,
            }
        });
        return result[0];
    }
}
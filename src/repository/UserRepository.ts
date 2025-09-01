import { User } from "../models/entity/User";
import { RepositoryInterface } from "./RepositoryInterface";
import databaseConfig from "../server/typeorm.conf";
import { Student } from "../models/entity/Studant";

export class UserRepository implements RepositoryInterface<User|null|Student>{
    async save(entity: User): Promise<void> {
        await databaseConfig.getRepository(User).save(entity);
    }
    async findById(id: string): Promise<User|Student|null> {
        const user = await databaseConfig.getRepository(User).find({
            where: {
                id: id
            },
            relations: {
                disciplines: true
            },
        });
        if (user) {
            return user[0];
        }
        return null;
    
    }
    async findAll(): Promise<User[]> {
        throw new Error("Method not implemented.");
    }
    async findByUserName(userName: string): Promise<User|null> {
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
    async findByUsername(userName: string) {
        return await databaseConfig.getRepository(User).findBy({
            username: userName,
        });
    }
    async findStudents() {
        return await databaseConfig.getRepository(Student).find();
    }
    async removeStudant(student: Student): Promise<void> {
        await databaseConfig.getRepository(Student).remove(student);
    }
}
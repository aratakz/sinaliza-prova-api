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
    
    async findById(id: string): Promise<User|Student|Professional|null> {
        const user:User|null = await databaseConfig.getRepository(User).findOneBy({
            id: id,
        });
        if (user) {
            return user;
        }
        return null;
    
    }
    
    async findAll(): Promise<User[]> {
        return await databaseConfig.getRepository(User).find();
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

}
import { User } from "../models/entity/User";
import { RepositoryInterface } from "./RepositoryInterface";
import databaseConfig from "../server/typeorm.conf";

export class UserRepository implements RepositoryInterface<User>{
    save(entity: User): Promise<void> {
        throw new Error("Method not implemented.");
    }
    
    async findById(id: string): Promise<User> {
        throw new Error("Method not implemented.");
    }
    
    async findAll(): Promise<User[]> {
        throw new Error("Method not implemented.");
    }
    
    async findByUserName(userName: string) {
        const user:User|null = await databaseConfig.getRepository(User).findOneBy({
            username: userName,
        });

        if (user) {
            return user;
        }
        return null;
    }
}
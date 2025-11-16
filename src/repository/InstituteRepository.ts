import {RepositoryInterface} from "./RepositoryInterface";
import {Institute} from "../models/entity";
import databaseConfig from "../server/typeorm.conf";
import {Like} from "typeorm";

export  class InstituteRepository implements RepositoryInterface<Institute|null> {

    async findAll(): Promise<Array<Institute>> {
        return databaseConfig.getRepository(Institute).find();
    }

     async findById(id: string): Promise<Institute|null> {
        const result = await databaseConfig.getRepository(Institute).find({
           where: {
               id: id
           },
            relations: {
               subscriptions: true
            }
        });
        if (!result) {
            return null;
        }
        return result[0];
    }

     async save(entity: Institute): Promise<Institute> {
        return await databaseConfig.getRepository(Institute).save(entity);
    }

    async findByText(text: string) {
        return await databaseConfig.getRepository(Institute).findBy({
            name: Like(`%${text}%`),
        });
    }

    async remove(entity: Institute): Promise<void> {
        await databaseConfig.getRepository(Institute).remove(entity);
    }
}
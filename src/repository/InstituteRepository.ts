import {RepositoryInterface} from "./RepositoryInterface";
import {Institute} from "../models/entity";
import databaseConfig from "../server/typeorm.conf";
import {Like} from "typeorm";

export  class InstituteRepository implements RepositoryInterface<Institute> {

    async findAll(): Promise<Array<Institute>> {
        return databaseConfig.getRepository(Institute).find();
    }

     async findById(id: string): Promise<Institute> {
         throw new Error("Method not implemented.");
    }

     async save(entity: Institute): Promise<void> {
        await databaseConfig.getRepository(Institute).save(entity);
    }

    async findByText(text: string) {
        return await databaseConfig.getRepository(Institute).findBy({
            name: Like(`%${text}%`),
        });
    }

}
import {RepositoryInterface} from "./RepositoryInterface";
import {Professional} from "../models/entity";
import databaseConfig from "../server/typeorm.conf";

export class ProfessionalRepository implements RepositoryInterface<Professional> {
    async findById(id:string): Promise<Professional> {
        const result = await databaseConfig.getRepository(Professional).findBy({
            id: id
        });
        return result[0];
    }
    async findAll(): Promise<Array<Professional>> {
        return await databaseConfig.getRepository(Professional).find();
    }
    async save(entity: Professional): Promise<Professional> {
        return await databaseConfig.getRepository(Professional).save(entity);
    }
}
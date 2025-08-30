import {RepositoryInterface} from "./RepositoryInterface";
import {Discipline} from "../models/entity";
import databaseConfig from "../server/typeorm.conf";

export class DisciplineRepository implements RepositoryInterface<Discipline> {
    async findAll(): Promise<Array<Discipline>> {
        return [];
    }

    async findById(id: string): Promise<Discipline> {
        return new  Discipline();
    }

    async save(entity: Discipline): Promise<void> {
        await  databaseConfig.getRepository(Discipline).save(entity);
        return Promise.resolve(undefined);
    }

}
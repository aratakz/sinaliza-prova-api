import {RepositoryInterface} from "./RepositoryInterface";
import {Discipline} from "../models/entity";
import databaseConfig from "../server/typeorm.conf";

export class DisciplineRepository implements RepositoryInterface<Discipline> {
    async findAll(): Promise<Array<Discipline>> {
        return databaseConfig.getRepository(Discipline).find();
    }

    async findById(id: string): Promise<Discipline> {
       const results = await databaseConfig.getRepository(Discipline).find({
           where: {id: id},
       });
       return results[0];
    }

    async save(entity: Discipline): Promise<void> {
        await  databaseConfig.getRepository(Discipline).save(entity);
    }

    async remove(discipline: Discipline): Promise<void> {
        await databaseConfig.getRepository(Discipline).remove(discipline);
    }

}
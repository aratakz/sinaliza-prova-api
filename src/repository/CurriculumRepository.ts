import {RepositoryInterface} from "./RepositoryInterface";
import {Curriculum} from "../models/entity";
import databaseConfig from "../server/typeorm.conf";

export class CurriculumRepository implements RepositoryInterface<Curriculum> {
    async findAll(): Promise<Array<Curriculum>> {
        return [];
    }

    async findById(id: string): Promise<Curriculum> {
        return new Curriculum();
    }

    async save(entity: Curriculum): Promise<Curriculum> {
        return databaseConfig.getRepository(Curriculum).save(entity);
    }

    async findByDiscipline(disciplineId: string): Promise<Array<Curriculum>> {
        return databaseConfig.getRepository(Curriculum).find({
            where: {
                discipline: {
                    id: disciplineId,
                }
            }
        });
    }

}
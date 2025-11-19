import {RepositoryInterface} from "./RepositoryInterface";
import {Exam} from "../models/entity";
import databaseConfig from "../server/typeorm.conf";

export class ExamRepository implements RepositoryInterface<Exam> {
    async findAll(): Promise<Array<Exam>> {
      return await databaseConfig.getRepository(Exam).find();
    }
    async findById(id: string): Promise<Exam> {
        const results = await databaseConfig.getRepository(Exam).find({
            where: {
                id: id
            },
            relations: {
                discipline: true,
                room: true,
                questions: {
                    fields: true
                }
            }
        });
        return results[0];
    }
    async save(entity: Exam): Promise<Exam> {
        return databaseConfig.getRepository(Exam).save(entity);
    }
    async remove(entity: Exam) {
        return await databaseConfig.getRepository(Exam).remove(entity);
    }
}
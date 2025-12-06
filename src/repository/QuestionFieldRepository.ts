import {RepositoryInterface} from "./RepositoryInterface";
import {Question, QuestionField} from "../models/entity";
import {Promise} from "mongoose";
import databaseConfig from "../server/typeorm.conf";

export class QuestionFieldRepository implements RepositoryInterface<QuestionField> {
    findAll(): Promise<Array<QuestionField>> {
        return Promise.resolve(undefined);
    }

    async findById(id: string): Promise<QuestionField> {
        const results = await databaseConfig.getRepository(QuestionField).find({
            where: {
                id: id
            },
            relations: {
                media: true
            }
        });
        return results[0];
    }

   async save(entity: QuestionField): Promise<QuestionField> {
        return await databaseConfig.getRepository(QuestionField).save(entity);
    }
}
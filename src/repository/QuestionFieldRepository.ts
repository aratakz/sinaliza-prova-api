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
    async findByQuestionId(id: string): Promise<QuestionField[]> {
        return await databaseConfig.getRepository(QuestionField).find({
            where: {
                question: {
                    id: id
                }
            },
            relations: {
                media: true
            }
        });
    }

   async save(entity: QuestionField): Promise<QuestionField> {
        return await databaseConfig.getRepository(QuestionField).save(entity);
    }
    async remove (questionField: QuestionField) {
        await databaseConfig.getRepository(QuestionField).remove(questionField);
    }
}
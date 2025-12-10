import {RepositoryInterface} from "./RepositoryInterface";
import {QuestionAnswer, QuestionOption, User} from "../models/entity";
import databaseConfig from "../server/typeorm.conf";

export class QuestionAnswerRepository implements RepositoryInterface<QuestionAnswer>{
    async findAll(): Promise<Array<QuestionAnswer>> {
        return await databaseConfig.getRepository(QuestionAnswer).find({
            relations: {
                user: true,
            }
        });
    }

    async findById(id: string): Promise<QuestionAnswer> {
        const results = await databaseConfig.getRepository(QuestionAnswer).find({
            where: {
                id: id
            },
            relations: {
                user: true
            }
        })
        return results[0];
    }

    async save(entity: QuestionAnswer): Promise<QuestionAnswer> {
       return await databaseConfig.getRepository(QuestionAnswer).save(entity);
    }

}
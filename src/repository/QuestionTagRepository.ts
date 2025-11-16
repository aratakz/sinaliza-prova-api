import {QuestionTag} from "../models/entity";
import {RepositoryInterface} from "./RepositoryInterface";
import databaseConfig from "../server/typeorm.conf";

export class QuestionTagRepository implements RepositoryInterface<QuestionTag> {
    async findAll(): Promise<Array<QuestionTag>> {
        return [];
    }

    async  findById(id: string): Promise<QuestionTag> {
        return new QuestionTag();
    }

    async save(entity: QuestionTag): Promise<QuestionTag> {
        return await databaseConfig.getRepository(QuestionTag).save(entity);
    }

}
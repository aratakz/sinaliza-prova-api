import {QuestionOption} from "../models/entity";
import {RepositoryInterface} from "./RepositoryInterface";
import databaseConfig from "../server/typeorm.conf";


export class QuestionOptionRepository  implements RepositoryInterface<QuestionOption> {
    async findAll(): Promise<Array<QuestionOption>> {
        return [];
    }

    async findById(id: string): Promise<QuestionOption> {
      return new QuestionOption();
    }

    async save(entity: QuestionOption): Promise<QuestionOption> {
        return await databaseConfig.getRepository(QuestionOption).save(entity);
    }


}
import {RepositoryInterface} from "./RepositoryInterface";
import {Question, QuestionField} from "../models/entity";
import {Promise} from "mongoose";
import databaseConfig from "../server/typeorm.conf";

export class QuestionFieldRepository implements RepositoryInterface<QuestionField> {
    findAll(): Promise<Array<QuestionField>> {
        return Promise.resolve(undefined);
    }

    findById(id: string): Promise<QuestionField> {
        return Promise.resolve(undefined);
    }

   async save(entity: QuestionField): Promise<QuestionField> {
        return await databaseConfig.getRepository(QuestionField).save(entity);
    }
}
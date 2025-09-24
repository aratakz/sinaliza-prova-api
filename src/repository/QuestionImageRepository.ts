import {RepositoryInterface} from "./RepositoryInterface";
import {QuestionImage} from "../models/entity";
import {Promise} from "mongoose";
import databaseConfig from "../server/typeorm.conf";

export class QuestionImageRepository implements RepositoryInterface<QuestionImage>{
    findAll(): Promise<Array<QuestionImage>> {
        return Promise.resolve(undefined);
    }

    findById(id: string): Promise<QuestionImage> {
        return Promise.resolve(undefined);
    }

    async save(entity: QuestionImage): Promise<void> {
        await databaseConfig.getRepository(QuestionImage).save(entity);

    }
    
}
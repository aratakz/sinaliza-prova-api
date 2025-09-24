import {RepositoryInterface} from "./RepositoryInterface";
import {Question, QuestionImage} from "../models/entity";
import {Promise} from "mongoose";
import databaseConfig from "../server/typeorm.conf";

export class QuestionImageRepository implements RepositoryInterface<QuestionImage>{
    async findAll(): Promise<Array<QuestionImage>> {
        return await databaseConfig.getRepository(QuestionImage).find({
            relations: {
                question: true
            },
        });
    }

    async findById(id: string): Promise<QuestionImage> {
        const result = await databaseConfig.getRepository(QuestionImage).find({
            where: {
                id: id
            }
        });
        return result[0];
    }

    async save(entity: QuestionImage): Promise<void> {
        await databaseConfig.getRepository(QuestionImage).save(entity);

    }
    async remove(entity: QuestionImage): Promise<void> {
        await databaseConfig.getRepository(QuestionImage).remove(entity);

    }

    async removeById(id:string): Promise<void> {
        const image = await this.findById(id);
        console.debug(image);
        if (image) {
            await databaseConfig.getRepository(QuestionImage).remove(image);
        }
    }
    
}
import {RepositoryInterface} from "./RepositoryInterface";
import {Question} from "../models/entity";
import databaseConfig from "../server/typeorm.conf";
import {QuestionFieldType} from "../models/enums";
import {Like} from "typeorm";

export class QuestionRepository implements RepositoryInterface<Question>{
    async findAll(): Promise<Array<Question>> {
        return await databaseConfig.getRepository(Question).find({
            relations: {
                fields: true
            },
        });
    }

    async findById(id: string): Promise<Question> {
        const result =  await databaseConfig.getRepository(Question).find({
            where: {
                id: id
            },
            relations: {
                fields: true,
                options: true,
                images: true
            }
        });
        return result[0];
    }

    async save(entity: Question): Promise<Question> {
        return await databaseConfig.getRepository(Question).save(entity);
    }
    async remove(entity: Question): Promise<void> {
        await databaseConfig.getRepository(Question).remove(entity);
    }

    async findByTitle(search: string) {
        return databaseConfig.getRepository(Question).find({
            where: {
                fields: {
                    fieldType: QuestionFieldType.title,
                    fieldValue: Like(`%${search}%`)
                }
            },
            relations: {
                fields: true
            }
        })
    }

}
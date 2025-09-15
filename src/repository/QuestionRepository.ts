import {RepositoryInterface} from "./RepositoryInterface";
import {Question} from "../models/entity";
import databaseConfig from "../server/typeorm.conf";

export class QuestionRepository implements RepositoryInterface<Question>{
    async findAll(): Promise<Array<Question>> {
        return [];
    }

    async findById(id: string): Promise<Question> {
        return new Question();
    }

    async save(entity: Question): Promise<void> {
        await databaseConfig.getRepository(Question).save(entity);

    }

}
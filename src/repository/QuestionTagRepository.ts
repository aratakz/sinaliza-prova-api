import {QuestionTag} from "../models/entity";
import {RepositoryInterface} from "./RepositoryInterface";

export class QuestionTagRepository implements RepositoryInterface<QuestionTag> {
    async findAll(): Promise<Array<QuestionTag>> {
        return [];
    }

    async  findById(id: string): Promise<QuestionTag> {
        return new QuestionTag();
    }

    async save(entity: QuestionTag): Promise<void> {
        return Promise.resolve(undefined);
    }

}
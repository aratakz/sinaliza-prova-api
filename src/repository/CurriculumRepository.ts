import {RepositoryInterface} from "./RepositoryInterface";
import {Curriculum} from "../models/entity";

export class CurriculumRepository implements RepositoryInterface<Curriculum> {
    async findAll(): Promise<Array<Curriculum>> {
        return [];
    }

    async findById(id: string): Promise<Curriculum> {
        return new Curriculum();
    }

    async save(entity: Curriculum): Promise<void> {
        return Promise.resolve(undefined);
    }

}
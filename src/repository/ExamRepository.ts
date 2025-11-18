import {RepositoryInterface} from "./RepositoryInterface";
import {Exam} from "../models/entity";
import {Promise} from "mongoose";
import databaseConfig from "../server/typeorm.conf";
import exam from "../routes/exam";

export class ExamRepository implements RepositoryInterface<Exam> {
    findAll(): Promise<Array<Exam>> {
        return Promise.resolve(undefined);
    }

    findById(id: string): Promise<Exam> {
        return Promise.resolve(undefined);
    }

    async save(entity: Exam): Promise<Exam> {
        return databaseConfig.getRepository(Exam).save(entity);
    }

}
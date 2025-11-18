import {RepositoryInterface} from "./RepositoryInterface";
import {Exam} from "../models/entity";
import {Promise} from "mongoose";
import databaseConfig from "../server/typeorm.conf";

export class ExamRepository implements RepositoryInterface<Exam> {
   async findAll(): Promise<Array<Exam>> {
      return await databaseConfig.getRepository(Exam).find();
    }

    findById(id: string): Promise<Exam> {
        return Promise.resolve(undefined);
    }

    async save(entity: Exam): Promise<Exam> {
        return databaseConfig.getRepository(Exam).save(entity);
    }

}
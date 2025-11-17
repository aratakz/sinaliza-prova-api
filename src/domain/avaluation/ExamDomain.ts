import {ExamRepository} from "../../repository/ExamRepository";
import {Exam} from "../../models/entity";
import {ExamDTO} from "./dto/ExamDTO";

export class ExamDomain {

    private examRepository : ExamRepository  = new ExamRepository();

    async create (examDTO: ExamDTO): Promise<Exam> {
        return await this.examRepository.save(new Exam());
    }
}
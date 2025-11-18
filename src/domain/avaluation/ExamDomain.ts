import {ExamRepository} from "../../repository/ExamRepository";
import {Exam} from "../../models/entity";
import {CreateExamDTO} from "./dto/CreateExamDTO";
import {DisciplineRepository} from "../../repository/DisciplineRepository";

export class ExamDomain {

    private examRepository : ExamRepository  = new ExamRepository();
    private disciplineRepository : DisciplineRepository  = new DisciplineRepository();

    async create (examDTO: CreateExamDTO): Promise<Exam> {
        const discipline = await this.disciplineRepository.findById(examDTO.discipline)
        if (!discipline) {
            throw Error('Discipline not found.');
        }
        const exam = new Exam({
            title: examDTO.title,
            discipline: discipline,
            date: examDTO.date,
            room: examDTO.room
        });
        discipline.exams = [exam];

        return await this.examRepository.save(exam);
    }

    async list () {
        return await this.examRepository.findAll();
    }
}
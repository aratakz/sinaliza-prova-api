import {ExamRepository} from "../../repository/ExamRepository";
import {Exam, Question} from "../../models/entity";
import {CreateExamDTO} from "./dto/CreateExamDTO";
import {DisciplineRepository} from "../../repository/DisciplineRepository";
import {RoomRepository} from "../../repository/RoomRepository";
import {QuestionRepository} from "../../repository/QuestionRepository";

export class ExamDomain {

    private examRepository : ExamRepository  = new ExamRepository();
    private disciplineRepository : DisciplineRepository  = new DisciplineRepository();
    private roomRepository : RoomRepository  = new RoomRepository();

    async create (examDTO: CreateExamDTO): Promise<Exam> {
        const discipline = await this.disciplineRepository.findById(examDTO.discipline);
        const room = await this.roomRepository.findById(examDTO.room);

        if (!discipline) {
            throw Error('Discipline not found.');
        }

        if (!room) {
            throw Error('Room not found.');
        }

        const exam = new Exam({
            title: examDTO.title,
            discipline: discipline,
            date: examDTO.date,
        });

        discipline.exams = [exam];
        exam.room = room;
        room.exams = [exam];

        if (examDTO.questions && examDTO.questions.length > 0) {
            const questionRepository: QuestionRepository = new QuestionRepository();
            let questions: Array<Question> = [];

            for (const questionId of examDTO.questions) {
                const question: Question = await questionRepository.findById(questionId);

                if (!question) {
                    throw Error('Question not found.');
                }

                questions.push(question)
            }

            exam.questions = questions;
        }
        return await this.examRepository.save(exam);
    }

    async list () {
        return await this.examRepository.findAll();
    }

    async findOne(id: string) {
        return await this.examRepository.findById(id);
    }
}
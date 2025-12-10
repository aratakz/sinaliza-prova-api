import {Request, Response} from "express";
import {QuestionOptionDomain} from "../../domain/QuestionOption";
import {QuestionAnswerRepository} from "../../repository/QuestionAnswerRepository";
import {UserRepository} from "../../repository/UserRepository";
import {Exam, QuestionAnswer, QuestionOption} from "../../models/entity";
import {QuestionOptionRepository} from "../../repository/QuestionOptionRepository";
import question from "../../models/schemas/Question";
import {ExamRepository} from "../../repository/ExamRepository";

class QuestionOptionController {
    async create(request: Request, response: Response) {
        try {

        } catch (error) {
            if (error instanceof Error) {
                response.status(500).send({message: error.message});
            }
        }
    }
    async getByQuestionId(request: Request, response: Response) {
        try {
            const domain = new QuestionOptionDomain();
            response.json(await domain.findByQuestionId(request.params.id));
        } catch (error) {
            if (error instanceof Error) {
                response.status(500).send({message: error.message});
            }
        }
    }

    async answer (request: Request, response: Response) {
        try {
            if (!request.body) {
                throw Error('no body')
            }
            const repo = new QuestionAnswerRepository();
            const user = await new UserRepository().findById(request.body.user);
            const answer = new QuestionAnswer();
            const option = await new QuestionOptionRepository().findById(request.body.question);
            if (request.body.isAnswer) {
                answer.isChecked = true;
            } else {
                answer.isChecked = false;
            }

            answer.question = option;
            if (user) {

                answer.user = user;
                user.questionAnswer = answer
                await new UserRepository().save(user);
            }

            await repo.save(answer);
            response.json({message: 'created!'})
        } catch (e) {
            if (e instanceof Error) {
                response.status(500).json({message: e.message})
            }
        }
    }
    async finish(request: Request, response: Response) {
        try {
            if (!request.params.id) {
                throw new Error('no id');
            }
            const repo = new ExamRepository();
            const exam:Exam = await repo.findById(request.params.id);
            exam.finished = true;
            await repo.save(exam);
            response.json('finished')
        } catch (e) {
            if (e instanceof Error) {
                response.status(500).json({message: e.message});
            }
        }
    }
}
export const controller = new QuestionOptionController();



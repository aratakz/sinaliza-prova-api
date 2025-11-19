import {QuestionOptionRepository} from "../repository/QuestionOptionRepository";
import {response} from "express";

export class QuestionOptionDomain {
    private questionOptionRepository: QuestionOptionRepository;
    constructor() {
        this.questionOptionRepository = new QuestionOptionRepository();
    }

    async findByQuestionId(questionId: string) {
        return await this.questionOptionRepository.findOneByQuestionId(questionId);
    }
}
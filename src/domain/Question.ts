import {QuestionRegisterDTO} from "../dto/QuestionRegisterDTO";
import {QuestionRepository} from "../repository/QuestionRepository";
import {Question} from "../models/entity";

export class QuestionDomain {
    readonly questionRepository: QuestionRepository;

    constructor() {
        this.questionRepository = new QuestionRepository();
    }

    async register(questionDTO: QuestionRegisterDTO) {
        const question = new Question();

        question.name = questionDTO.name;

        // await this.questionRepository.save(question);
    }
}
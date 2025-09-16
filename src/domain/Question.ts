import {QuestionRegisterDTO} from "../dto/QuestionRegisterDTO";
import {QuestionRepository} from "../repository/QuestionRepository";
import {Question, QuestionField} from "../models/entity";
import {QuestionFieldRepository} from "../repository/QuestionFieldRepository";
import {QuestionFieldType} from "../models/enums";

export class QuestionDomain {

    readonly questionRepository: QuestionRepository;
    readonly fieldRepository: QuestionFieldRepository;

    constructor() {
        this.questionRepository = new QuestionRepository();
        this.fieldRepository = new QuestionFieldRepository();
    }

    async register(questionDTO: QuestionRegisterDTO) {
        const question = new Question();
        question.name = questionDTO.name;

        const title = new QuestionField();
        const support_data = new QuestionField();

        title.fieldType = QuestionFieldType.title;
        title. fieldValue = questionDTO.title;
        title.question = question;
        if (questionDTO.support_data) {
            support_data.fieldType = QuestionFieldType.support_data;
            support_data.fieldValue = questionDTO.support_data;
            await this.fieldRepository.save(support_data);
        }
        await this.fieldRepository.save(title);

        const fields: QuestionField[] = [title];
        if (questionDTO.support_data) {
            fields.push(support_data);
        }
        question.fields = fields;

        await this.questionRepository.save(question);
    }

    async getAll(): Promise<Question[]> {
        return this.questionRepository.findAll();
    }
}
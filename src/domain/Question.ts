import {QuestionRegisterDTO} from "../dto/QuestionRegisterDTO";
import {QuestionRepository} from "../repository/QuestionRepository";
import {Question, QuestionField, QuestionOption} from "../models/entity";
import {QuestionFieldRepository} from "../repository/QuestionFieldRepository";
import {QuestionFieldType} from "../models/enums";
import {QuestionOptionRepository} from "../repository/QuestionOptionRepository";
import {AnswerDTO} from "../dto/AnswerDTO";

export class QuestionDomain {

    readonly questionRepository: QuestionRepository;
    readonly fieldRepository: QuestionFieldRepository;
    readonly questionOptionRepository: QuestionOptionRepository;

    constructor() {
        this.questionRepository = new QuestionRepository();
        this.fieldRepository = new QuestionFieldRepository();
        this.questionOptionRepository = new QuestionOptionRepository();
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

        if (questionDTO.answers) {
            let answers: Array<QuestionOption> = [];
            for (const option of questionDTO.answers) {
                const newOption = new QuestionOption();
                newOption.question = question;
                newOption.title = option.title;
                newOption.videoLink = undefined;
                if (option.isAnswer) {
                    newOption.isAnswer = option.isAnswer;
                } else {
                    newOption.isAnswer = false;
                }
                answers.push(newOption);
                console.debug('newOption');
                console.debug(option);
                await this.questionOptionRepository.save(newOption);
            }
            question.options  = answers
        }

        await this.questionRepository.save(question);
    }

    async getAll(): Promise<Question[]> {
        return this.questionRepository.findAll();
    }
}
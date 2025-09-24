import {AnswerDTO} from "./AnswerDTO";

export type QuestionRegisterDTO = {
    name: string;
    title: string;
    support_data?: string;
    answers?: Array<AnswerDTO>;
    removedImages?: Array<string>;
    file?: Array<string>
}
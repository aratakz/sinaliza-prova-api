import {ExamDTO} from "./ExamDTO";
import {ExamValidation} from "../validation/ExamValidation";

export class CreateExamDTO extends ExamDTO {

    title: string;
    discipline: string;
    room: string;
    date: Date;
    questions: Array<string>

    constructor(entries: CreateExamDTO) {
        super();
        this.title = entries.title;
        this.discipline = entries.discipline;
        this.room = entries.room;
        this.date = entries.date;
        this.questions = entries.questions;

        new ExamValidation(this).validateCreation();
    }
}
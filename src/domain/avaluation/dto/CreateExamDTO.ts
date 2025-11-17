import {ExamDTO} from "./ExamDTO";
import {ExamValidation} from "../validation/ExamValidation";

export class CreateExamDTO extends ExamDTO {

    title: string;
    disciplineId: number;
    roomId: number;
    date: string;
    questions: Array<number>

    constructor(entries: CreateExamDTO) {
        super();
        this.title = entries.title;
        this.disciplineId = entries.disciplineId;
        this.roomId = entries.roomId;
        this.date = entries.date;
        this.questions = entries.questions;

        new ExamValidation(this).validateCreation();
    }
}
import {ExamDTO} from "../dto/ExamDTO";
import {CreateExamDTO} from "../dto/CreateExamDTO";

export class ExamValidation {

    dto: ExamDTO;
    constructor(dto: ExamDTO) {
        this.dto = dto;
    }

    validateCreation() {
        if (!(this.dto instanceof CreateExamDTO)) {
            throw Error('ExamValidation type is invalid');
        }

        if (!this.dto.title) throw Error('Exam title is required');
        if (!this.dto.date) throw Error('Exam date is required');
        if (!this.dto.disciplineId) throw Error('Exam discipline is required');
        if (!this.dto.roomId) throw Error('Exam room is required');
        if (!this.dto.questions) throw Error('Exam questions is required');
    }
}
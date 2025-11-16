import {ProfessionalDTO} from "../ProfessionalDTO";
import {AccessLevel} from "../../models/enums";

export class ProfessionalDTOValidation {
    dto: ProfessionalDTO;
    constructor(dto: ProfessionalDTO) {
        this.dto = dto;
    }

    validate() {
        if (!this.dto.name) throw new Error('fiel name is required!');
        if (!this.dto.cpf) throw new Error('field cpf is required!');
        if (!this.dto.login) throw new Error('field login is required!');
        if (!this.dto.password) throw new Error('field password is required!');
        if (!this.dto.email) throw new Error('field email is required!');
        if (!this.dto.accessLevel) throw new Error('field accessLevel is required!');
        if (![
            AccessLevel.PROFESSIONAL,
            AccessLevel.ADMIN,
            AccessLevel.STUDENT,
            AccessLevel.TEACHER
        ].includes(this.dto.accessLevel)) {
            throw new Error('Invalid access level supplied');
        }
    }
}
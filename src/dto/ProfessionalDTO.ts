import {ProfessionalDTOValidation} from "./validation/ProfessionalDTOValidation";

export class ProfessionalDTO {
    name: string;
    login: string;
    password: string;
    email: string;
    cpf: string;
    accessLevel: number;

    constructor(entries: ProfessionalDTO) {
     this.name = entries.name;
     this.login = entries.login;
     this.password = entries.password;
     this.email = entries.email;
     this.cpf = entries.cpf;
     this.accessLevel = entries.accessLevel;

     new ProfessionalDTOValidation(this).validate();
    }

}
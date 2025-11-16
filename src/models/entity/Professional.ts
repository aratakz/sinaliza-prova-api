import { Entity } from "typeorm";
import {User} from "./User";
import {ProfessionalDTO} from "../../dto";

@Entity()
export class Professional extends User {
    constructor(professional: ProfessionalDTO) {
        super();
        if (professional) {
            this.name = professional.name;
            this.email = professional.email;
            this.username = professional.login
            this.cpf = professional.cpf;
            this.accessLevel = professional.accessLevel.toString();
        }
    }
}
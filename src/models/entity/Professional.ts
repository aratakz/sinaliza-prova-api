import {ChildEntity, Column, } from "typeorm";
import {User} from "./User";
import {ProfessionalDTO} from "../../dto";
import {ulid} from "ulid";

@ChildEntity()
export class Professional extends User {
    @Column({type: 'varchar', length: 5000})
    tempPassword: string;
    @Column({type: 'boolean'})
    isFirstLogin: boolean;

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

    async prepareFirstLogin (): Promise<Professional>{
        const tempPass = ulid();
        this.username = ulid();
        this.password = await this.enctypePassword(tempPass)
        this.active = true;
        this.tempPassword = tempPass;
        return this;
    }
}
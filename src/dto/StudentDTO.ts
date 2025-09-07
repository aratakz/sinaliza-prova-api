import {DisciplineDTO} from "./DisciplineDTO";

export type StudentDTO = {
    cpf: string;
    username: string;
    name: string;
    password: string;
    confirmPassword: string;
    birthday: string;
    email: string;
    institute: string;
    disciplines: DisciplineDTO[]
}
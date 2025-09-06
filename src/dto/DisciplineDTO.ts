import {CurriculumDTO} from "./CurriculumDTO";

export type DisciplineDTO = {
    name: string,
    requestToken?: string,
    value?: string,
    label?: string,
    id?: string,
    curriculum?: CurriculumDTO[],
}
import {CurriculumRepository} from "../repository/CurriculumRepository";
import {Curriculum} from "../models/entity";

export class CurriculumDomain {

    private curriculumRepository: CurriculumRepository;

    constructor() {
        this.curriculumRepository = new CurriculumRepository();
    }

    async listByDiscipline(disciplineId: string): Promise<Curriculum[]> {
        return await this.curriculumRepository.findByDiscipline(disciplineId);
    }
}
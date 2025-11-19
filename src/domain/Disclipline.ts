import {AuthTokenRepository} from "../repository/AuthToekenRepository";
import {DisciplineRepository} from "../repository/DisciplineRepository";
import {DisciplineDTO} from "../dto/DisciplineDTO";
import {Curriculum, Discipline} from "../models/entity";
import auth from "../routes/auth";
import {CurriculumRepository} from "../repository/CurriculumRepository";

export class DisciplineDomain {

    private readonly authTokenRepository: AuthTokenRepository;
    private readonly disciplineRepository: DisciplineRepository;
    private readonly curriculumRepository: CurriculumRepository;
    constructor() {
        this.disciplineRepository = new DisciplineRepository();
        this.authTokenRepository = new AuthTokenRepository();
        this.curriculumRepository = new CurriculumRepository();
    }

    async create (disciplineDTO: DisciplineDTO) {
        if (!disciplineDTO.requestToken) {
            throw new Error('Authorization header is no present!');
        }


        const authToken = await this.authTokenRepository.findToken(disciplineDTO.requestToken);

        if (!authToken) {
            throw Error('Authorization token is no present!');
        }

        if (!authToken.user) {
            throw Error('Authorization token is invalid');
        }

        let discipline: Discipline = new Discipline();
        discipline.name = disciplineDTO.name;
        discipline.institute = authToken.user.institute;
        discipline.curriculums = await  this.addCurriculum(disciplineDTO, discipline);
        await this.disciplineRepository.save(discipline);
    }

    async list () {
        return await this.disciplineRepository.findAll();
    }

    async remove (disciplineId: string) {
        const discipline = await this.disciplineRepository.findById(disciplineId);
        if (!discipline) {
            throw Error('Discipline not found!');
        }
        await this.disciplineRepository.remove(discipline);
    }

    async findOne(disciplineId: string) {
        const result = await this.disciplineRepository.findById(disciplineId);
        if (!result) {
            throw Error('Discipline not found!');
        }
        return result;
    }

    async update (disciplineId: string, disciplineDTO: DisciplineDTO) {
        if (!disciplineId) {
            throw Error('Discipline id note provided!');
        }
        const discipline: Discipline = await this.disciplineRepository.findById(disciplineId);

        if (!discipline) {
            throw Error('Discipline not found!');
        }
        discipline.name = disciplineDTO.name;
        discipline.curriculums = await this.addCurriculum(disciplineDTO, discipline);
        await this.disciplineRepository.save(discipline);
    }

    private async addCurriculum(disciplineDTO: DisciplineDTO, discipline: Discipline) {
        const curriculumList: Curriculum[] = []
        if (disciplineDTO.curriculum) {
            for (const curriculum  of disciplineDTO.curriculum) {
               let  curriculumInstance:any = {
                   name: curriculum.name,
                   discipline: discipline,
                   weight: curriculum.weight,
               };
               await this.curriculumRepository.save(curriculumInstance);
               curriculumList.push(curriculumInstance);
            }
        }

        return curriculumList;
    }
}
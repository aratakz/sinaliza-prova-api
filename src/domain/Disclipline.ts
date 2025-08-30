import {AuthTokenRepository} from "../repository/AuthToekenRepository";
import {DisciplineRepository} from "../repository/DisciplineRepository";
import {DisciplineDTO} from "../dto/DisciplineDTO";
import {Discipline} from "../models/entity";

export class DisciplineDomain {

    private readonly authTokenRepository: AuthTokenRepository;
    private readonly disciplineRepository: DisciplineRepository;
    constructor() {
        this.disciplineRepository = new DisciplineRepository();
        this.authTokenRepository = new AuthTokenRepository();
    }

    async create (disciplineMetadata: DisciplineDTO) {
        if (!disciplineMetadata.requestToken) {
            throw new Error('Authorization header is no present!');
        }


        const authToken = await this.authTokenRepository.findToken(disciplineMetadata.requestToken);

        if (!authToken) {
            throw Error('Authorization token is no present!');
        }
        if (!authToken.user || !authToken.user.institute) {
            throw Error('Authorization token is invalid');
        }

        let discipline: Discipline = new Discipline();
        discipline.name = disciplineMetadata.name;
        discipline.institute = authToken.user.institute;
        await this.disciplineRepository.save(discipline);
    }
}
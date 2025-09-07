import {AuthTokenRepository} from "../repository/AuthToekenRepository";
import {InstituteRepository} from "../repository/InstituteRepository";
import {UserRepository} from "../repository/UserRepository";

export class InstituteDomain  {

    private readonly authTokenRepository: AuthTokenRepository;
    private readonly instituteRepository: InstituteRepository;
    private readonly userRepository: UserRepository;

    constructor() {
        this.authTokenRepository = new AuthTokenRepository();
        this.instituteRepository = new InstituteRepository();
    }

    async getByToken(token: string) {
        const authToken = await this.authTokenRepository.findToken(token);

        if (!authToken) {
            throw Error(`Token not found`);
        }

        if (!authToken.user || !authToken.user.id) {
            throw new Error(`Token not valid`);
        }
        if (!authToken.user || !authToken.user.institute) {
            throw new Error(`Institute not found`);
        }
        return authToken.user.institute;
    }

    async findById(id: string) {
        return await this.instituteRepository.findById(id);
    }
}
import { Request, Response } from 'express';
import {InstituteRepository} from "../repository/InstituteRepository";


export class InstituteController {
    async index(request: Request, response: Response) {
        const instituteRepository = await  new InstituteRepository().findAll();
        response.json(instituteRepository);
    }
}

export default new InstituteController();
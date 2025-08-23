import { Request, Response } from 'express';
import {InstituteRepository} from "../repository/InstituteRepository";


export class InstituteController {
    async index(request: Request, response: Response) {
        const instituteRepository = await  new InstituteRepository().findAll();
        response.json(instituteRepository);
    }

    async register(request: Request, response: Response) {

        if (!request.body) {
           return response.status(500).json({ message: 'No body provided' })
        }

        if (!request.body.name) {
          return  response.status(500).json({ message: 'name field is required' })
        }
        await  new InstituteRepository().save(request.body);
        response.json('Instituição cadastrada com sucesso!');
    }

    async find() {}
}

export default new InstituteController();
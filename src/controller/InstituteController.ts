import { Request, Response } from 'express';
import {InstituteRepository} from "../repository/InstituteRepository";


export class InstituteController {
    async index(request: Request, response: Response) {
        const instituteRepository = await  new InstituteRepository().findAll();
        response.json(instituteRepository);
    }

    async register(request: Request, response: Response) {
        try {
            if (!request.body) {
                response.status(500).json({ message: 'No body provided' })
            }

            if (!request.body.name) {
                throw new Error('name field is required');
            }
            await  new InstituteRepository().save(request.body);
            response.json('Instituição cadastrada com sucesso!');
        } catch (e) {
            response.status(500).json({ message: e})
        }

    }

    async find() {}
}

export default new InstituteController();
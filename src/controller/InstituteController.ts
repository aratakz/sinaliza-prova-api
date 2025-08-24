import { Request, Response } from 'express';
import {InstituteRepository} from "../repository/InstituteRepository";
import {Institute} from "../models/entity";


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

    async findOneByText(request: Request, response: Response) {
        const repository = new InstituteRepository();
        const institutes: Institute[] =  await repository.findByText(request.params.text);
        let responseArray:Object[] = [];
        for (const institute of institutes) {
            responseArray.push({
                value: institute.id,
                label: institute.name,
            });
        }
        response.json(responseArray);
    }
}

export default new InstituteController();
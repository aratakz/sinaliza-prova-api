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

    async findById(request: Request, response: Response) {
        try {
            const repository = new InstituteRepository();
            const id = request.params.id;
            const institute: Institute|null = await repository.findById(id);
            if (!institute) {
                throw new Error('institute not found');
            }
            response.json(institute);
        } catch (error) {
            if (error instanceof Error) {
                response.status(500).json({ message: error.message })
            }
        }
    }

    async update(request: Request, response: Response) {
        try {
            const id = request.params.id;
            const repository = new InstituteRepository();
            const body = request.body;
            if (!body) {
                throw new Error('institute not found');
            }
            if (!body.name) {
                throw new Error('name field is required');
            }

            const institute: Institute|null = await repository.findById(id);
            if (!institute) {
                throw new Error('institute not found');
            }
            institute.name = body.name;
            await repository.save(institute);
            response.json({message : 'updated register'});
        } catch (error) {
            if (error instanceof Error) {
                response.status(500).json({ message: error.message })
            }
        }
    }
    async remove(request: Request, response: Response) {
        try {
            const id = request.params.id;
            if (!id) {
                throw new Error('institute id not informed!');
            }
            const repository = new InstituteRepository();
            const institute: Institute|null = await repository.findById(id);
            if (!institute) {
                throw new Error('institute not found');
            }
            await repository.remove(institute);
            response.json({message : 'deleted register'});
        } catch (error) {
            if (error instanceof Error) {
                response.status(500).json({ message: error.message });
            }
        }
    }
}

export const controller = new InstituteController();

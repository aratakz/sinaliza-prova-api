import { Request, Response } from 'express';
import {DisciplineDomain} from "../domain/Disclipline";
import databaseConfig from "../server/typeorm.conf";


export class  DisciplineController {

    async getAll (request: Request, response: Response) {
        try {
            const domain = new DisciplineDomain();
            response.json(await domain.list());
        } catch (error) {
            if (error instanceof Error) {
                response.status(500).send({message: error.message});
            }
        }
    }

    async register (request: Request, response: Response) {
        try {
            if (!request.body) {
                throw Error('no body provided');
            }
            if (!request.body.name) {
                throw Error('Name field is required');
            }
            if (!request.headers.authorization) {
                throw Error('Authorization header is no present!');
            }

            const requestToken = request.headers.authorization.replace('Bearer ', '');
            const disciplineDomain = new DisciplineDomain();

            await disciplineDomain.create({...request.body,...{requestToken: requestToken}});

            response.json({message: "created"});
        } catch (error) {
            if (error instanceof Error) {
                response.status(500).json({ message: error.stack});
            }
        }
    }

    async remove (request: Request, response: Response) {
        try {
            if (!request.params.id) {
                throw Error('no id is provided.');
            }
            const domain: DisciplineDomain = new DisciplineDomain();
            await domain.remove(request.params.id);
            response.json({message: "deleted"});
        } catch (error) {
            if (error instanceof Error) {
                response.status(500).send({message: error.message});
            }
        }
    }
}

export default new DisciplineController();
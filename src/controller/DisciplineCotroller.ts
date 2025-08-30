import { Request, Response } from 'express';
import {DisciplineDomain} from "../domain/Disclipline";


export class  DisciplineController {

    async getAll (request: Request, response: Response) {
        response.json('');
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
}

export default new DisciplineController();
import { EmailService } from './../services/EmailService';
import {Request, Response} from 'express';

class UsersController {
    async index(request:Request, response: Response): Promise<any> {
        response.json('users routes');
    }

    async updatePassword() {

    }
}

export default new UsersController();

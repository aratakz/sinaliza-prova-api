import { Student } from '../models/entity/Studant';
import { UserRepository } from '../repository/UserRepository';
import { EmailService } from './../services/EmailService';
import {Request, Response} from 'express';

class UsersController {
    async index(request:Request, response: Response): Promise<any> {
        response.json('users routes');
    }

    async updatePassword() {

    }

    async getUserInfo (request: Request, response: Response) {
        const user = await new UserRepository().findById(request.params.userId);

        if (!user) {
            response.status(404).json({ message: 'User not found!' });
        }
        response.json({ user: {
            id: user?.id,
            avatar: user?.avatarLink,
            email: user?.email,
            name: user?.name,
            birthday: user instanceof Student ? user.birthday : null
        }, register: new Date() });

        
    }
}

export default new UsersController();

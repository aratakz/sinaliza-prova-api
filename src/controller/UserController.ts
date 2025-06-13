import { Student } from '../models/entity/Studant';
import { UserRepository } from '../repository/UserRepository';
import { EmailService } from './../services/EmailService';
import { Request, Response } from 'express';

class UsersController {
    async index(request: Request, response: Response): Promise<any> {
        response.json('users routes');
    }

    async updatePassword() {

    }

    async getUserInfo(request: Request, response: Response) {
        const user = await new UserRepository().findById(request.params.userId);

        if (!user) {
            response.status(404).json({ message: 'User not found!' });
        }
        if (user) {

            let bDay = ''
            if (user instanceof Student) {
                const bDayObject = new Date(user.birthday);
                let day: string|number = '';
                let mount: string|number = '';
                
                if (bDayObject.getDay() < 10) {
                    day = `0${bDayObject.getDay()}`;
                }

                if (bDayObject.getMonth() < 10) {
                    mount = `0${bDayObject.getMonth()}`;
                } else {
                    mount = bDayObject.getMonth();
                }
                bDay = `${day}/${mount}/${bDayObject.getFullYear()}`;
            }
            response.json({
                user: {
                    id: user?.id,
                    avatar: user?.avatarLink,
                    email: user?.email,
                    name: user?.name,
                    birthday: bDay
                }, register: new Date()
            });
        }

    }
}
export default new UsersController();

import { UserDomain } from '../domain/User';
import { Professional } from '../models/entity';
import { Student } from '../models/entity/Studant';
import { AccessProfile } from '../models/enums/AccessProfile';
import { UserRepository } from '../repository/UserRepository';
import { EmailService } from './../services/EmailService';
import { Request, Response } from 'express';

class UsersController {
    async index(request: Request, response: Response): Promise<any> {
        response.json('users routes');
    }

    async updatePassword() {

    }

    async getUsers (request: Request, response: Response) {
        const users = await new UserRepository().findAll();
        response.json(users);
    }

    async getUserInfo(request: Request, response: Response) {
        if (!request.params || !request.params.userId) {
            response.status(422).json({ message: 'No user id is provided!' })
        }
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

            if(user instanceof Professional){
                response.json({
                    user: {
                        id: user?.id,
                        avatar: user?.avatarLink,
                        email: user?.email,
                        name: user?.name,
                        AccessProfile: user?.accessProfile
                    }, register: new Date()
                })
            }
        }

    }

    async update (request: Request, response: Response) {
        if (!request.params || !request.params.userId) {
            response.status(422).json({ message: 'No user id is provided!' });
        }
        if (!request.body) {
            response.status(422).json({ message: 'No user id is provided!' });
        }

        const user = await new UserRepository().findById(request.params.userId);

        if (user != null) {
            new UserDomain().update(user, request.body)

        } else {
            response.status(404).json({ message: 'User not found!'})
        }
    }

    async deleteUser() {
        
    }

    async checkUsername(request: Request, response: Response) {
        const username: string = request.params.username;
        const users = await new UserRepository().findByUserName(username);
         if (users) {
             response.json({
                 available: false,
             });
         } else {
             response.json({
                 available: true,
             });
         }
    }
}
export default new UsersController();

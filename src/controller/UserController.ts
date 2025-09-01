import { UserDomain } from '../domain/User';
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
        if (!request.params || !request.params.userId) {
            response.status(422).json({message: 'No user id is provided!'})
        }
        const user = await new UserRepository().findById(request.params.userId);

        if (!user) {
            response.status(404).json({message: 'User not found!'});
        }
        if (user) {

            let bDay = ''
            if (user instanceof Student) {
                const bDayObject = new Date(user.birthday);
                let day: string | number = '';
                let mount: string | number = '';

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

    async update(request: Request, response: Response) {
        try {
            if (!request.params || !request.params.id) {
                response.status(422).json({message: 'No id is provided!'});
            }
            if (!request.body) {
                response.status(422).json({message: 'No body is provided!'});
            }

            const domain: UserDomain = new UserDomain();
            response.json(await domain.updateStudent(request.params.id, request.body));
        } catch (error) {
            if (error instanceof Error) {
                response.status(500).json({message: error.message});
            }
        }
    }

    async checkUsername(request: Request, response: Response) {
        const username: string = request.params.username;
        const users = await new UserRepository().findByUsername(username);
        if (users && users.length > 0) {
            response.json({
                available: false,
            });
        } else {
            response.json({
                available: true,
            });
        }
    }

    async register(request: Request, response: Response) {
        try {
            if (!request.body) {
                throw new Error('No body is provided!');
            }
            if (!request.headers) {
                throw new Error('Headers not present!');
            }

            if (!request.headers.authorization) {
                throw new Error('Authorization header not present!');
            }

            const domain = new UserDomain();
            await domain.createStudent(request.headers.authorization
                .replace('Bearer ', ''), request.body);
            response.json({message: 'created'})
        } catch (error) {
            if (error instanceof Error) {
                response.status(500).json({message: error.message});
            }
        }
    }

    async getAllStudents(request: Request, response: Response) {
        try {
            const domain = new UserDomain();
            response.json(await domain.getStudents());
        } catch (error) {
            if (error instanceof Error) {
                response.status(500).json({message: error.message});
            }
        }
    }

    async remove(request: Request, response: Response) {
        try {
            if (!request.params || !request.params.id) {
                throw new Error('No id is provided!');
            }
            const domain = new UserDomain();
            await domain.remove(request.params.id);
            response.json({message: 'deleted'})
        } catch (error) {
            if (error instanceof Error) {
                response.status(500).json({message: error.message});
            }
        }
    }

    async findById(request: Request, response: Response) {
        try {
            if (!request.params || !request.params.id) {
                throw new Error('No id is provided!');
            }
            const domain = new UserDomain();
            response.json(await domain.getStudent(request.params.id));
        } catch (error) {
            if (error instanceof Error) {
                response.status(500).json({message: error.message});
            }
        }
    }
}

export default new UsersController();

import {Request, Response} from 'express';

class UsersController {
    async index(request:Request, response: Response): Promise<any> {
        response.json('users routes');
    }
}

export default new UsersController();

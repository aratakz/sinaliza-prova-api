import {Request, Response} from 'express';
import 'dotenv/config'
import { Security } from '../domain/Security';
export class AuthController {

    
    constructor() {}

    async sigin(request: Request, response: Response) {
        const  securityDomain: Security = new Security;
        const token  =  await securityDomain.getCredentials('', '');
        response.json({token: token, register: new Date()});
    }
}

export default new AuthController();
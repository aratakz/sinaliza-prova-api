import {Request, Response} from 'express';
import 'dotenv/config'
import { Security } from '../domain/Security';
export class AuthController {


    constructor() {
    }

    async signin(request: Request, response: Response) {
        try {
            const securityDomain: Security = new Security;
            const token = await securityDomain.getCredentials(request.body.username, request.body.password);
            response.json({token: token, register: new Date()});
        } catch (exception) {
            const errorCode = (<Error>exception).stack;
            if (errorCode) {
                if (Number.parseInt(errorCode)) {
                    response.status(Number.parseInt(errorCode)).json({message: (<Error>exception).message})
                }
                return;
            }
            response.status(500).json({message: 'Unexpected error!'})
        }

    }

}

export default new AuthController();
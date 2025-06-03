import {Request, Response} from 'express';
import 'dotenv/config'
import { Security } from '../domain/Security';
import { AuthException } from '../domain/exception/AuthExceptoion';
export class AuthController {


    constructor() {
    }

    async signin(request: Request, response: Response) {
        try {
            if (!request.body) {
                response.status(500).json({message: 'No body provided'})

            }
            if (!request.body.username || !request.body.password) {
                response.status(401).json({message: 'Login or password do not match!'})
            }
            const securityDomain: Security = new Security;
            const token = await securityDomain.getCredentials(request.body.username, request.body.password);
            response.json({token: token, register: new Date()});
        } catch (exception) {
            const errorCode = (<AuthException>exception).error;
            if (errorCode) {
                    response.status(errorCode).json({message: (<AuthException>exception).message})
                }
                return;
            }
            response.status(500).json({message: 'Unexpected error!'})
        }

    }

export default new AuthController();
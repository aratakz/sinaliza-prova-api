import {Request, Response} from 'express';
import 'dotenv/config'
import { Security } from '../domain/Security';
export class AuthController {

    
    constructor() {}

    async sigin(request: Request, response: Response) {
        try {
            const  securityDomain: Security = new Security;
            const token  =  await securityDomain.getCredentials(request.body.username,request.body.password);
            response.json({token: token, register: new Date()});
        } catch (exception) {
            const  errrorCode = (<Error>exception).stack;
            if (errrorCode) {
               if (Number.parseInt(errrorCode)) {
                response.status(Number.parseInt(errrorCode)).json({message: (<Error>exception).message})
               }
               return; 
            } 
            response.status(500).json({message: 'Unexpected error!'})
        }
        
    }
}

export default new AuthController();
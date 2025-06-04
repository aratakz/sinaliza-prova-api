import { Request, Response } from 'express';
import 'dotenv/config'
import { Security } from '../domain/Security';
import { AuthException } from '../domain/exception/AuthExceptoion';
import { Student } from '../models/entity/Studant';
import { UserDomain } from '../domain/User';
import { ExitentRecordException } from '../domain/exception/ExistentRecordException';
export class AuthController {


    constructor() {
    }

    async signin(request: Request, response: Response) {
        try {
            console.debug(request);
            if (!request.body) {
                response.status(500).json({ message: 'No body provided' })

            }
            if (!request.body.username || !request.body.password) {
                response.status(401).json({ message: 'Login or password do not match!' })
            }
            const securityDomain: Security = new Security;
            const token = await securityDomain.getCredentials(request.body.username, request.body.password);
            response.json({ token: token, register: new Date() });
        } catch (exception) {
            const errorCode = (<AuthException>exception).error;
            if (errorCode) {
                response.status(errorCode).json({ message: (<AuthException>exception).message })
            }
            return;
        }
        response.status(500).json({ message: 'Unexpected error!' })
    }

    async register(request: Request, response: Response) {

        if (!request.body) {
            response.status(500).json({ message: 'No body provided' })
        }

        if (!request.body.username) {
            response.status(422).json({ message: 'username field is required!' })
        }
        if (!request.body.password) {
            response.status(422).json({ message: 'password field is required!' })
        }
        if (!request.body.confirmPassword) {
            response.status(422).json({ message: 'confirmPassowrd field is required!' })
        }
        if (!request.body.name) {
            response.status(422).json({ message: 'name field is required!' })
        }
        if (!request.body.birthday) {
            response.status(422).json({ message: 'birthday field is required!' })
        }
        if (!request.body.email) {
            response.status(422).json({ message: 'email field is required!' })
        }
        if (!request.body.institute) {
            response.status(422).json({ message: 'institute field is required!' })
        }
        if (!AuthController.validateDateFormat(request.body.birthday)) {
            response.status(422).json({ message: 'Wrong date format' })
        }

        try {
            await new UserDomain().createSudant(request.body);
            response.status(201).json({ status: "created" });
        } catch (exception) {
            const errorCode = (<ExitentRecordException>exception).error;
            if (errorCode) {
                response.status(errorCode).json({ message: (<ExitentRecordException>exception).message })
            }
            return;
        }
        response.status(500).json({ message: 'Unexpected error!' })
    }
    private static validateDateFormat(dateString: string) {
        console.debug('sas')
        const regex = /^\d{4}-\d{2}-\d{2}$/;
        return regex.test(dateString);
    }

}

export default new AuthController();
import { Request, Response } from 'express';
import 'dotenv/config'
import { Security } from '../domain/Security';
import { AuthException } from '../domain/exception/AuthExceptoion';
import { UserRepository } from '../repository/UserRepository';
import {TwoFactorTokenRepository} from "../repository/TwoFactorTokenRepository";
import moment from "moment";

export class AuthController {


    constructor() {
    }

    async signin(request: Request, response: Response) {
        try {
            if (!request.body) {
                response.status(500).json({ message: 'No body provided' })
            }
            if (!request.body.username || !request.body.password) {
                response.status(401).json({ message: 'Login or password do not match!' })
            }
            const securityDomain: Security = new Security;

            try{
                const token = await securityDomain.getCredentials(request.body.username, request.body.password);
                console.debug('hehs');
                response.json({ token: token, register: new Date()});
            } catch(error){
                throw new AuthException();
            }

        } catch (exception) {
            const errorCode = (<AuthException>exception).error;
            if (errorCode) {
                response.status(errorCode).json({ message: (<AuthException>exception).message })
            } else {
                console.debug(exception);
                response.status(400).json({ message: 'invalid credentials'});
            }
        }
    }

    async logout (request: Request, response: Response) {
        
        if (!request.body) {
            response.status(422).json({ message: 'No body provided'})
        }

        if (!request.body.token) {
            response.status(422).json({ message: 'No token provided' });
        }
        const securityDomain = new Security();
        await securityDomain.finishSection(request.body.token);
        response.json({message: "logout success!"});
        
    }

    async requestPassChange(request: Request, response: Response) {
        if (!request.body) {
            response.status(422).json({ message: 'No body provided'});
        }

        if (!request.body.email) {
            response.status(422).json({ message: 'email field is requred!'});

        }

        const user = await new UserRepository().findByEmail(request.body.email);
        if (!user) {
            response.status(404).json({ message: 'Email not found!'});
            throw Error('Email field is required!');
        }
        if (user?.email) {
            await new Security().sendPassChangeEmail(user?.email);
        }

        response.json({message: "recuperation email sended!"});
        
    }

    async checkTwoFactorToken(request: Request, response: Response) {
        try {
            const repository = new TwoFactorTokenRepository()
            const tokens = await repository.findByToken(request.params.token);
            if (!tokens) {
               response.status(404).json({ message: 'No token provided' });
            }
            const now = moment();
            const expires = moment(tokens[0].expiration);
            if (now.toDate() > expires.toDate()) {
                response.status(422).json({ valid: false});
            } else {
                response.json({valid: true})
            }
        } catch (error) {
            if (error instanceof Error) {
                response.status(404).json({message: error.message});
            }
        }

    }

    async activateUser(request: Request, response: Response) {
        try {
            const twoFactorTokenRepository = new TwoFactorTokenRepository();
            const tokens = await twoFactorTokenRepository.findByToken(request.params.token);

            if (!tokens) {
                throw new Error('No token provided');
            }

            const usersRepository = new UserRepository();
            if (!tokens[0].user || !tokens[0].user.id) {
                throw new Error('No user found');
            }
            const user = await usersRepository.findById(tokens[0].user.id);
            if (!user) {
                throw new Error('No user found');
            }
            if (user.active) {
                await twoFactorTokenRepository.remove(tokens[0]);
                throw new Error('User already activated');
            }

            user.active = true;
            await usersRepository.save(user);
            await twoFactorTokenRepository.remove(tokens[0]);

            response.json({
                status: "activated",
            })
        } catch (error) {
            if (error instanceof Error) {
                response.status(500).json({ message: 'Unexpected error' });
            }
        }
    }

    async studentFirstLogin(request: Request, response: Response) {
        try {
            if (!request.body)  {
                throw new Error('No body is provided');
            }
            const domain = new Security();
            await domain.sendFirstLoginStudentEmail(request.body);
            response.json({message: "success"})
        } catch (error) {
            if (error instanceof Error) {
                response.status(500).json({ message: error.message});
            }
        }
    }

    private static validateDateFormat(dateString: string) {
        const regex = /^\d{4}-\d{2}-\d{2}$/;
        return regex.test(dateString);
    }
}

export default new AuthController();
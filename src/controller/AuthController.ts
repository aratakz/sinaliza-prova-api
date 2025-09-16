import { Request, Response } from 'express';
import 'dotenv/config'
import { Security } from '../domain/Security';
import { AuthException } from '../domain/exception/AuthExceptoion';
import { UserDomain } from '../domain/User';
import { ExitentRecordException } from '../domain/exception/ExistentRecordException';
import { UserRepository } from '../repository/UserRepository';
import {TwoFactorTokenRepository} from "../repository/TwoFactorTokenRepository";
import moment from "moment";
import {AuthTokenRepository} from "../repository/AuthToekenRepository";
import auth from "../routes/auth";
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
            const token = await securityDomain.getCredentials(request.body.username, request.body.password);
            response.json({ token: token, register: new Date()});
        } catch (exception) {
            const errorCode = (<AuthException>exception).error;
            if (errorCode) {
                response.status(errorCode).json({ message: (<AuthException>exception).message })
            } else {
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

        try {
            if (!request.body) {
                throw new Error('No body provided');
            }

            if (!request.body.cpf) {
                throw Error('CPF field is required!');

            }

            const domain = new Security();
            await domain.sendRecoverPassEmail(request.body);
            response.json({message: "recuperation email sent!"});
        } catch (error) {
            if (error instanceof Error) {
                response.status(400).json({ error: error.message });
            }
        }
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

    async checkAuthToken(request: Request, response: Response) {
        try {
            const repository = new AuthTokenRepository()
            const authToken = await repository.findToken(request.params.token);
            if (!authToken) {
                response.status(404).json({ message: 'No token provided' });
            }
            const domain = new Security();
            await domain.isValidToken(authToken.token).catch((error) => {
                throw new Error('Invalid token');
            });
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

    async updatePass(request: Request, response: Response) {
        try {
            if (!request.body) {
                throw new Error('No body is provided');
            }
            if (!request.params.token) {
                throw new Error('No token provided');
            }

            const domain = new Security();
            await domain.updateCredentials(request.params.token, request.body);

            response.json({message: 'updated'});
        } catch (error) {
            if (error instanceof Error) {
                response.status(400).json({ error: error.message });
            }
        }
    }
    private static validateDateFormat(dateString: string) {
        const regex = /^\d{4}-\d{2}-\d{2}$/;
        return regex.test(dateString);
    }
}

export default new AuthController();
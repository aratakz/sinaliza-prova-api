import * as jwt from 'jsonwebtoken';
import 'dotenv/config';
import { UserRepository } from '../repository/UserRepository';
import { AuthException } from './exception/AuthExceptoion';

export class Security {
    private userRepository: UserRepository;

    constructor() {
        this.userRepository = new UserRepository();
    }

    async getCredentials(userName: string, password: string) {
        if (process.env.TOKEN_SECRET) {
            if (!await this.userRepository.findByUserName(userName)) {
                throw new AuthException();
            }
            return jwt.sign({ id: '' }, process.env.TOKEN_SECRET, {
                expiresIn: '2h'
            });
        }

        throw 'No secret is configured';
    }
}
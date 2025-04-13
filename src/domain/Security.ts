import * as jwt from 'jsonwebtoken';
import 'dotenv/config';
import { UserRepository } from '../repository/UserRepository';
import { AuthException } from './exception/AuthExceptoion';
import * as bcrypt from 'bcrypt';
import { AuthTokenRepository } from '../repository/AuthToekenRepository';

export class Security {
    private userRepository: UserRepository;
    private authTokenRepository: AuthTokenRepository;
    constructor() {
        this.userRepository = new UserRepository();
        this.authTokenRepository = new AuthTokenRepository;
    }

    async getCredentials(userName: string, password: string) {
        if (process.env.TOKEN_SECRET) {
            const user = await this.userRepository.findByUserName(userName);
            if (!user) {
                throw new AuthException();
            }
            if (!password) {
                throw new AuthException();

            }
            if (!await bcrypt.compare(password, user.password)) {
                throw new AuthException();
            }
            const token = jwt.sign({ id: '' }, process.env.TOKEN_SECRET, {
                expiresIn: '2h'
            });

            await this.authTokenRepository.save({
                token: token,
                user: user
            });
            return token; 
        }

        throw 'No secret is configured';
    }
}
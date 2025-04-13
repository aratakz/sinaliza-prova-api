import * as jwt from 'jsonwebtoken';
import 'dotenv/config';
import { UserRepository } from '../repository/UserRepository';
import { AuthException } from './exception/AuthExceptoion';
import * as bcrypt from 'bcrypt';
import { AuthTokenRepository } from '../repository/AuthToekenRepository';
import { User } from '../models/entity/User';

export class Security {
    private userRepository: UserRepository;
    private authTokenRepository: AuthTokenRepository;
    constructor() {
        this.userRepository = new UserRepository();
        this.authTokenRepository = new AuthTokenRepository;
    }

    async getCredentials(userName: string, password: string) {
        if (process.env.TOKEN_SECRET) {
            const user: User|null = await this.userRepository.findByUserName(userName);
            if (!user) {
                throw new AuthException();
            }
            if (!password) {
                throw new AuthException();

            }
            if (!await bcrypt.compare(password, user.password)) {
                throw new AuthException();
            }

            const authToken = await this.authTokenRepository.findLastByUserId(user);
            if (authToken) {
                if (jwt.verify(authToken.token, process.env.TOKEN_SECRET)) {
                    return authToken.token;
                } else {
                    return this.generateNewToken(user, process.env.TOKEN_SECRET); 
                }
            }
            return this.generateNewToken(user, process.env.TOKEN_SECRET);
        }
        
        throw 'No secret is configured';
    }

    private async generateNewToken(user: User, secret: string) {
        const token = jwt.sign({ id: '' }, secret, {
            expiresIn: '2h'
        });
    
        await this.authTokenRepository.save({
            token: token,
            user: user
        });
        return token;
    }
}
import * as jwt from 'jsonwebtoken';
import 'dotenv/config';
import { UserRepository } from '../repository/UserRepository';
import { AuthException } from './exception/AuthExceptoion';
import * as bcrypt from 'bcrypt';
import { AuthTokenRepository } from '../repository/AuthToekenRepository';
import { User } from '../models/entity/User';
import { EmailService } from '../services/EmailService';

type Email = {
    title: string,
    from: string,
    to: string,
    subject: string,
    text?: string,
    html?: string
}

export class Security {
    private userRepository: UserRepository;
    private authTokenRepository: AuthTokenRepository;
    constructor() {

        if (!process.env.TOKEN_SECRET) {
            throw 'No secret is configured';
        }

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
            if (!user.active) {
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

    async updateCredentials (user: User, password: string) {
        user.password = await bcrypt.hash(password, 12);
        await this.userRepository.save(user);
    }

    async sendPassChangeEmail (emailFrom: string) {
        const email: Email = {
        from: "server@email.com",
        to: emailFrom,
            subject: "Recuperação de senha",
            title: "Recuperação de senha",
            text: "Olá, para prosseguir com a alteração da senha, clique no link abaixo"
        }
        // const emailService = new EmailService(email);
        // await emailService.sendEmail();
    }

    async isValidToken(token:string) {
        if (process.env.TOKEN_SECRET) {
            return jwt.verify(token, process.env.TOKEN_SECRET);

        }
        return false;
    }

    async finishSection (token: string) {
        const storedToken = await this.authTokenRepository.findToken(token);
        
        if (storedToken) {
            await this.authTokenRepository.removeToken(storedToken);
        }
    }

    private async generateNewToken(user: User, secret: string) {
        const token = jwt.sign({ userData: {
            name: user.name,
            id: user.id,
            avatar: user.avatarLink
        }}, secret, {
            expiresIn: '2h'
        });
    
        await this.authTokenRepository.save({
            token: token,
            user: user
        });
        return token;
    }
    
}
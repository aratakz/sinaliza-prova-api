import * as jwt from 'jsonwebtoken';
import 'dotenv/config';
import { UserRepository } from '../repository/UserRepository';
import { AuthException } from './exception/AuthExceptoion';
import * as bcrypt from 'bcrypt';
import { AuthTokenRepository } from '../repository/AuthToekenRepository';
import { User } from '../models/entity/User';
import { EmailService } from '../services/EmailService';
import {FirstLoginStudentDTO} from "../dto/FistLoginStudentDTO";
import {UserDomain} from "./User";
import {InstituteDomain} from "./InstituteDomain";
import {TwoFactorTokenRepository} from "../repository/TwoFactorTokenRepository";
import {ulid} from "ulid";
import {TwoFactorToken} from "../models/entity/TwoFactorToken";
import moment from "moment";
import {RecoverEmailDTO} from "../dto/RecoverEmailDTO";
import {readdirSync} from "node:fs";
import {UpdatePassDto} from "../dto/UpadatePassDTO";
import question from "../models/schemas/Question";

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
    private twoFactorTokenRepository: TwoFactorTokenRepository = new TwoFactorTokenRepository();
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

            const token = await this.authTokenRepository.findLastByUserId(user);

            if (token) {
                await this.authTokenRepository.removeToken(token);
            }

            return this.generateNewToken(user, process.env.TOKEN_SECRET);
        }
        
        throw 'No secret is configured';
    }

    async updateCredentials (token: string, updatePassDTO: UpdatePassDto) {
        const  twoFactorTokens  = await this.twoFactorTokenRepository.findByToken(token);

        if (!twoFactorTokens || !twoFactorTokens[0]) {
            throw new Error('No token found.');
        }
        if (moment().toDate() > moment(twoFactorTokens[0].expiration).toDate()) {
            throw new Error('Expired token');
        }

        if (!updatePassDTO.password) {
            throw new Error('Update pass not provided');
        }

        if (!updatePassDTO.confirmPassword) {
            throw new Error('Update pass confirm not provided');
        }

        if (updatePassDTO.password != updatePassDTO.password) {
            throw new Error('Update pass do not match');
        }


        await twoFactorTokens[0].user.setPassword(updatePassDTO.password);
        await this.userRepository.save(twoFactorTokens[0].user);
    }

    async sendRecoverPassEmail(recoverEmailDTO: RecoverEmailDTO) {
        const userDomain = new UserDomain();
        const user = await userDomain.getUserByCPF(recoverEmailDTO.cpf);
        const tempUlid = ulid();

        const twoFactorToken: TwoFactorToken = new TwoFactorToken();
        twoFactorToken.user = user;
        twoFactorToken.expiration = moment().add(20, 'minutes').toDate();
        twoFactorToken.token = tempUlid;
        await this.twoFactorTokenRepository.save(twoFactorToken);

        const email: Email = {
            from: "server@email.com",
            to: user.email,
            subject: "Solicitacao de recuperação de senha",
            title: "Recuperação de acesso",
            text: "Olá, voce acaba de se cadastrar no Sinaliza prova. Para concluir o seu cadastro, basta acessar o link abaixo!"
        }
        const emailService = new EmailService(email, 'recover', [{
            studentName: user.name,
            activationLink: `http://localhost:4200/auth/recover/${tempUlid}`,
        }]);
        await emailService.sendEmail();
    }

    async isValidToken(token:string) {
        if (process.env.TOKEN_SECRET) {
            try {
                return jwt.verify(token, process.env.TOKEN_SECRET);
            } catch (e) {
                throw new AuthException();
                return false;
            }

        }
        return false;
    }

    async finishSection (token: string) {
        const storedToken = await this.authTokenRepository.findToken(token);
        
        if (storedToken) {
            await this.authTokenRepository.removeToken(storedToken);
        }
    }

    async sendFirstLoginStudentEmail(firstLoginDTO: FirstLoginStudentDTO) {
        if (!firstLoginDTO.login) {
            throw new Error(`No login provided`);
        }
        if (!firstLoginDTO.cpf) {
            throw new Error(`No cpf provided`);
        }
        if (!firstLoginDTO.confirmPassword) {
            throw new Error(`No password confirm provided`);
        }
        if (!firstLoginDTO.password) {
            throw new Error(`No password provided`);
        }
        if (!firstLoginDTO.institute) {
            throw new Error(`No institute provided`);
        }

        if (firstLoginDTO.password != firstLoginDTO.confirmPassword) {
            throw new Error(`No pass match`);
        }

        let isWeak = false;
        isWeak = firstLoginDTO.password.length < 8;
        if (isWeak) {
            throw new Error('Weak password');
        }
        isWeak = !firstLoginDTO.password.match(/[a-z]+/);
        if (isWeak) {
            throw new Error('Weak password');
        }
        isWeak = !firstLoginDTO.password.match(/[A-Z]+/);
        if (isWeak) {
            throw new Error('Weak password');
        }
        isWeak = !firstLoginDTO.password.match(/[0-9]+/);
        if (isWeak) {
            throw new Error('Weak password');
        }
        isWeak = !firstLoginDTO.password.match(/[$@#&!]+/);
        if (isWeak) {
            throw new Error('Weak password');
        }

        const userDomain = new UserDomain();
        const student = await userDomain.getStudentByCPF(firstLoginDTO.cpf);

        if (!student) {
            throw new Error(`No student found`);
        }

        if (student.active) {
           throw new Error('pre activated user');
        }

        const instituteDomain = new InstituteDomain();
        const institute = await instituteDomain.findById(firstLoginDTO.institute);

        if (!institute) {
            throw new Error(`institute not found`);
        }

        if (student.institute.id != institute.id) {
            throw new Error(`institute not found`);
        }

        await student.setPassword(firstLoginDTO.password);
        student.username = firstLoginDTO.login;

        await this.userRepository.save(student);

        const tempUlid = ulid();

        const twoFactorToken: TwoFactorToken = new TwoFactorToken();
        twoFactorToken.user = student;
        twoFactorToken.token = tempUlid;
        twoFactorToken.expiration = moment().add(5, 'minutes').toDate();

        await this.twoFactorTokenRepository.save(twoFactorToken);

        const email: Email = {
            from: "server@email.com",
            to: student.email,
            subject: "Seu cadastro no Sinaliza Prova foi criado!",
            title: "Acesso a plataforma Sinaliza prova",
            text: "Olá, voce acaba de se cadastrar no Sinaliza prova. Para concluir o seu cadastro, basta acessar o link abaixo!"
        }
        const emailService = new EmailService(email, 'activation', [{
            studentName: student.name,
            activationLink: `http://localhost:4200/auth/activate/${tempUlid}`,
        }]);
        await emailService.sendEmail();
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
import {
    Column,
    Entity,
    JoinColumn,
    JoinTable,
    ManyToMany,
    ManyToOne,
    OneToMany,
    OneToOne,
    TableInheritance
} from "typeorm";
import { AuthToken } from "./AuthToken";
import { BaseEntity } from "./BaseEntity";
import * as bcrypt from 'bcrypt';
import {Institute} from "./Institute";
import {Discipline} from "./Discipline";
import {AccessLevel} from "../enums";
import {AuthException} from "../../domain/exception/AuthExceptoion";
import {AuthTokenRepository} from "../../repository/AuthToekenRepository";
import {Student} from "./Studant";
import {UpdateUserDTO} from "../../dto";
import {MetadataExecption} from "../../domain/exception/MetadataException";
import {S3Service} from "../../services/S3Sevice";
import {QuestionAnswer} from "./QuestionAnswer";

@Entity()
@TableInheritance({column: {type: 'varchar', name: 'type'}})
export abstract class User extends BaseEntity {
    @Column({type: "varchar", length: 255, default: null})
    username: string;

    @Column({type: "varchar", length: 500, default: null    })
    password: string;

    @OneToMany(() => AuthToken, (authToken) => authToken.user)
    tokens:AuthToken[];

    @Column({type: "varchar", length: 500})
    name: string;

    @Column({type: "varchar", length: 500})
    email: string;

    @Column({type: "boolean"})
    active: boolean = false;

    @Column({type:"longtext",default: null})
    avatarLink?: string;

    @Column({type: "varchar", length: 500})
    cpf: string;

    @ManyToOne(() => Institute, (institute) => institute.id)
    institute: Institute;

    @Column({
        type:  'enum',
        enum: AccessLevel,
        default: AccessLevel.PROFESSIONAL
    })
    accessLevel: string;

    @ManyToMany(() => Discipline, {cascade: true})
    @JoinTable()
    disciplines: Discipline[];

    @OneToOne(() => QuestionAnswer)
    @JoinColumn()
    questionAnswer: QuestionAnswer

    confirmPassword?:string;



    async setPassword(password:string) {
        this.password = (await bcrypt.hash(password, 12)).toString();
    }
    async enctypePassword(password:string) {
        return (await bcrypt.hash(password, 12)).toString();
    }
    async validateCredentials(credentials: any) {
        if (!await bcrypt.compare(credentials.password, this.password)) {
            throw new AuthException();
        }
        return true;
    }
    async isActive() {
        if (!this.active) {
            throw new AuthException();
        }
        return true;
    }
    async getToken(repository: AuthTokenRepository) {
        const token = await repository.findLastByUserId(this);
        if (token) {
            await repository.removeToken(token);
        }
        return new AuthToken().generate(repository, this, process.env.TOKEN_SECRET);
    }

    async addRegisterData(input: UpdateUserDTO) {
        this.name = input.name;
        this.email = input.email;

        if (input.login) {
            this.username = input.login
        }

        if (input.password && input.passwordConfirm) {
            if (input.passwordConfirm != input.passwordConfirm) {
                throw new MetadataExecption('Passwords do not match!');
            }
            this.password = await this.enctypePassword(input.password);
        }
    }

    async updateAvatar(image: any) {
        const s3Service = new S3Service();
        if (this.avatarLink) {
            await s3Service.removeObject(this.avatarLink);
        }

        const imageLink = await s3Service.sendImage(image);
        if (imageLink) {
            this.avatarLink = imageLink;
        }
    }

}
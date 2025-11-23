import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { BaseEntity } from "./BaseEntity";
import {Professional} from "./Professional";
import * as jwt from "jsonwebtoken";
import {AuthTokenRepository} from "../../repository/AuthToekenRepository";

@Entity()
export class AuthToken  extends BaseEntity {
    @Column({type: "longtext"})
    token: string;

    @ManyToOne(() => User, (user) => user.tokens)
    user: User|null;


    async generate(repository: AuthTokenRepository, user: User, secret: any) {
        const token = jwt.sign({ userData: {
                name: user.name,
                id: user.id,
                avatar: user.avatarLink,
                access: user.accessLevel,
            }}, secret, {
            expiresIn: '2h'
        });
        this.token = token;
        await repository.save(this);
        return token;
    }
}
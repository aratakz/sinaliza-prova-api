import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { BaseEntity } from "./BaseEntity";
import {Professional} from "./Professional";

@Entity()
export class AuthToken  extends BaseEntity {
    @Column({type: "longtext"})
    token: string;

    @ManyToOne(() => User, (user) => user.tokens)
    user: User|null;
}
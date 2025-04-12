import { Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { AuthToken } from "./AuthToken";
import { BaseEntity } from "./BaseEntity";

@Entity()
export class User extends BaseEntity {
    @Column({type: "varchar", length: 255})
    username: string;

    @Column({type: "varchar", length: 500})
    password: string;

    @OneToMany(() => AuthToken, (authToken) => authToken.user)
    tokens:AuthToken[];
}
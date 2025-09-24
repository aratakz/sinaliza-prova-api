import {Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, TableInheritance} from "typeorm";
import { AuthToken } from "./AuthToken";
import { BaseEntity } from "./BaseEntity";
import * as bcrypt from 'bcrypt';
import {Institute} from "./Institute";
import {Discipline} from "./Discipline";

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

    confirmPassword?:string;

    async setPassword(password:string) {
        this.password = (await bcrypt.hash(password, 12)).toString();
    }

    @ManyToMany(() => Discipline, {cascade: true})
    @JoinTable()
    disciplines: Discipline[];
}
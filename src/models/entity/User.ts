import { Column,Entity,OneToMany, TableInheritance } from "typeorm";
import { AuthToken } from "./AuthToken";
import { BaseEntity } from "./BaseEntity";
import * as bcrypt from 'bcrypt';

@Entity()
@TableInheritance({column: {type: 'varchar', name: 'type'}})
export abstract class User extends BaseEntity {
    @Column({type: "varchar", length: 255})
    username: string;

    @Column({type: "varchar", length: 500})
    password: string;

    @OneToMany(() => AuthToken, (authToken) => authToken.user)
    tokens:AuthToken[];

    @Column({type: "varchar", length: 500})
    name: string;

    @Column({type: "varchar", length: 500})
    email: string;


    confirmPassword?:string;

    async setPassword(password:string) {
        this.password = (await bcrypt.hash(password, 12)).toString();
    }
}
import {BaseEntity} from "./BaseEntity";
import {User} from "./User";
import {Column, Entity, ManyToOne, OneToOne} from "typeorm";

@Entity({name: 'two_factor_token'})
export class TwoFactorToken  extends BaseEntity {
    @Column({type: 'longtext'})
    token: string;
    @Column({type: 'datetime'})
    expiration: Date;
    @ManyToOne(() => User)
    user: User;
}
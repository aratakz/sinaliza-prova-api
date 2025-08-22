import {BaseEntity} from "./BaseEntity";
import {User} from "./User";
import {Column, Entity, OneToOne} from "typeorm";

@Entity({name: 'two_factor_token'})
export class TwoFactorToken  extends BaseEntity {
    @Column({type: 'varchar', length: 100})
    token: string;
    @Column({type: 'datetime'})
    expiration: Date;
    @OneToOne(() => User)
    user: User;
}
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { BaseEntity } from "./BaseEntity";

@Entity()
export class AuthToken  extends BaseEntity {
    @Column({type: "varchar", length: 600})
    token: string;

    @ManyToOne(() => User, (user) => user.tokens)
    user: User;

}
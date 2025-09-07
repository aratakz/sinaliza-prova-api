import {Column, Entity, ManyToOne, OneToMany} from "typeorm";
import {BaseEntity} from "./BaseEntity";
import {Subscription} from "./Subscription";
import {Discipline} from "./Discipline";
import {User} from "./User";

@Entity()
export class Institute extends BaseEntity {
    @Column({
        type: 'varchar',
        nullable: false,
    })
    name: string

    @ManyToOne(() => Subscription, (subscription) => subscription.institute)
    subscriptions: Subscription[];

    @OneToMany(() => Discipline, (disciplines) => disciplines.id)
    disciplines: Discipline[];

    @OneToMany(() => User, (user) => user.id)
    users: User[];
}
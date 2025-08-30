import {Column, Entity, ManyToOne, OneToMany} from "typeorm";
import {BaseEntity} from "./BaseEntity";
import {Subscription} from "./Subscription";

@Entity()
export class Institute extends BaseEntity {
    @Column({
        type: 'varchar',
        nullable: false,
    })
    name: string

    @ManyToOne(() => Subscription, (subscription) => subscription.institute)
    subscriptions: Subscription[];
}
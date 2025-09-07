import {Column, Entity, ManyToOne, OneToMany} from "typeorm";
import {BaseEntity} from "./BaseEntity";
import {Institute} from "./Institute";

@Entity()
export class Subscription extends BaseEntity {
    @Column({type: 'varchar'})
    name: string;

    @Column({type: "int", name: "total_storage"})
    totalStorage: number;

    @OneToMany(() => Institute, (institute) => institute.subscriptions)
    institute: Institute;
}
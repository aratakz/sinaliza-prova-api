import {BaseEntity} from "./BaseEntity";
import {Column, Entity} from "typeorm";


@Entity()
export class Room extends BaseEntity {
    @Column()
    name: string;
}
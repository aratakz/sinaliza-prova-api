import {Column, Entity} from "typeorm";
import {BaseEntity} from "./BaseEntity";

@Entity()
export class Institute extends BaseEntity {
    @Column({
        type: 'varchar',
        nullable: false,
    })
    name: string
}
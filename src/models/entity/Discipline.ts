import {BaseEntity} from "./BaseEntity";
import {Column, Entity, ManyToOne, OneToMany} from "typeorm";
import {Institute} from "./Institute";

@Entity()
export class Discipline extends BaseEntity {
    @Column()
    name:string;

    @ManyToOne(() => Institute, (institute) => institute.id)
    institute: Institute

    @OneToMany(() => Institute, (institute) => institute.id)
    curriculums: Institute[]
}
import {BaseEntity} from "./BaseEntity";
import {Column, Entity, ManyToOne, OneToMany} from "typeorm";
import {Discipline} from "./Discipline";

@Entity({name: 'curriculum'})
export class Curriculum extends BaseEntity{

    @Column({type: "varchar"})
    name: string;

    @Column({type: 'double'})
    weight: number;

    @ManyToOne(() => Discipline, (discipline) => discipline.id)
    discipline: Discipline

}
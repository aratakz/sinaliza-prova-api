import {BaseEntity} from "./BaseEntity";
import {Column, Entity, JoinColumn, ManyToOne, OneToMany} from "typeorm";
import {Discipline} from "./Discipline";

@Entity({name: 'curriculum'})
export class Curriculum extends BaseEntity{

    @Column({type: "varchar"})
    name: string;

    @Column({type: 'double'})
    weight: number;

    @ManyToOne(() => Discipline, (discipline) => discipline.curriculums, {
        onDelete: 'CASCADE',
    })
    @JoinColumn({name: 'discipline_id'})
    discipline: Discipline

}
import {Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany} from "typeorm";
import { BaseEntity } from "./BaseEntity";
import {Discipline} from "./Discipline";
import {Room} from "./Room";
import room from "../../routes/room";

@Entity()
export class Exam extends BaseEntity{
    @Column({type: 'varchar', length: 255})
    title: string;

    @Column({type: 'date'})
    date: Date;

    @OneToMany(discipline => Discipline, discipline => discipline.exams, {onDelete: 'CASCADE'})
    discipline: Discipline;

    @Column({type: 'varchar', length: 255})
    room: string;
}
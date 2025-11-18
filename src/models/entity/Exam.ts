import {Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany} from "typeorm";
import { BaseEntity } from "./BaseEntity";
import {Discipline} from "./Discipline";
import {Room} from "./Room";
import room from "../../routes/room";
import {ExamDTO} from "../../domain/avaluation/dto/ExamDTO";

@Entity()
export class Exam extends BaseEntity{

    @Column({type: 'varchar', length: 255})
    title: string;

    @Column({type: 'date'})
    date: Date;

    @ManyToOne(() => Discipline, (discipline: Discipline) => discipline.exams)
    discipline: Discipline;

    @Column({type: 'varchar', length: 255})
    room: string;

    constructor(exam: Exam) {
        super();
        if (exam) {
            this.date = exam.date;
            this.title = exam.title;
            this.discipline = exam.discipline;
            this.room = exam.room;
        }
    }
}
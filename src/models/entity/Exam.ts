import {Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany} from "typeorm";
import { BaseEntity } from "./BaseEntity";
import {Discipline} from "./Discipline";
import {Room} from "./Room";
import {Question} from "./Question";


@Entity()
export class Exam extends BaseEntity{

    @Column({type: 'varchar', length: 255})
    title: string;

    @Column({type: 'date'})
    date: Date;

    @ManyToOne(() => Discipline, (discipline: Discipline) => discipline.exams)
    discipline: Discipline;

    @ManyToOne(() => Room, (room: Room) => room.exams)
    room?: Room;

    @ManyToMany(() => Question)
    @JoinTable({
        name: 'exam_question',
    })
    questions?: Question[];

    constructor(exam: Exam) {
        super();
        if (exam) {
            this.date = exam.date;
            this.title = exam.title;
            this.discipline = exam.discipline;
        }
    }
}
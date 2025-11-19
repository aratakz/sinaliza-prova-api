import {BaseEntity} from "./BaseEntity";
import {Column, Entity, OneToMany, Relation} from "typeorm";
import {Exam} from "./Exam";


@Entity()
export class Room extends BaseEntity {
    @Column()
    name: string;

    @OneToMany(()=> Exam, exam => exam.room)
    exams?: Relation<Exam[]>;
}

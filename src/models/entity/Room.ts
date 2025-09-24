import {BaseEntity} from "./BaseEntity";
import {Column, Entity, ManyToOne, OneToMany} from "typeorm";
import {Student} from "./Studant";
import {Exam} from "./Exam";


@Entity()
export class Room extends BaseEntity {
    @Column()
    name: string;

    @OneToMany(()=> Student, student => student.room)
    students?: Student[];
}
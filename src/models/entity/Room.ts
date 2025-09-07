import {BaseEntity} from "./BaseEntity";
import {Column, Entity, OneToMany} from "typeorm";
import {Student} from "./Studant";


@Entity()
export class Room extends BaseEntity {
    @Column()
    name: string;

    @OneToMany(()=> Student, student => student.room)
    students?: Student[];
}
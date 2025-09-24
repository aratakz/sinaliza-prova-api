import {BaseEntity} from "./BaseEntity";
import {Column, Entity, JoinColumn, ManyToOne, OneToMany} from "typeorm";
import {Institute} from "./Institute";
import {Curriculum} from "./Curriculum";
import {Exam} from "./Exam";

@Entity()
export class Discipline extends BaseEntity {
    @Column()
    name:string;

    @ManyToOne(() => Institute, (institute) => institute.id)
    institute: Institute

    @OneToMany(() => Curriculum, (curriculum) => curriculum.discipline)
    curriculums: Curriculum[];


    @ManyToOne(() => Exam, exam => exam.discipline)
    exams: Exam[];
}
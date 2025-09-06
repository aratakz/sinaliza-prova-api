import {BaseEntity} from "./BaseEntity";
import {Column, Entity, JoinColumn, ManyToOne, OneToMany} from "typeorm";
import {Institute} from "./Institute";
import {Curriculum} from "./Curriculum";

@Entity()
export class Discipline extends BaseEntity {
    @Column()
    name:string;

    @ManyToOne(() => Institute, (institute) => institute.id)
    institute: Institute

    @OneToMany(() => Curriculum, (curriculum) => curriculum.discipline, { cascade: true})
    curriculums: Curriculum[];
}
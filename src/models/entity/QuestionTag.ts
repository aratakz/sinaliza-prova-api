import {Column, Entity, JoinTable, ManyToMany, ManyToOne, Table} from "typeorm";
import {BaseEntity} from "./BaseEntity";
import {Question} from "./Question";

@Entity()
export class QuestionTag extends BaseEntity {

    @Column()
    name: string;
}
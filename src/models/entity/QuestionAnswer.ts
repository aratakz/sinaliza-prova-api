import {Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToOne} from "typeorm";
import {BaseEntity} from "./BaseEntity";
import {QuestionOption} from "./QuestionOption";
import {User} from "./User";

@Entity()
export class QuestionAnswer extends  BaseEntity{
    @ManyToOne(() => QuestionOption)
    @JoinColumn()
    question: QuestionOption;


    @Column({type: "bool"})
    isChecked: boolean;

    user: User;


}
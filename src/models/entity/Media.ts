import {Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToOne} from "typeorm";
import {BaseEntity} from "./BaseEntity";
import {QuestionField} from "./QuestionField";
import {Question} from "./Question";
import question from "../schemas/Question";
import {QuestionOption} from "./QuestionOption";

@Entity()
export class Media extends BaseEntity{

    @Column({type: 'longtext'})
    link: string;

    @OneToOne(() => QuestionField)
    @JoinColumn()
    field?: QuestionField;

    @ManyToOne(() => Question, (question: Question)=> question.media)
    @JoinColumn()
    question?: Question;

    @ManyToOne(() => QuestionOption)
    @JoinColumn()
    questionOption?: QuestionOption;
}

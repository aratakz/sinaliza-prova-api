import {BaseEntity} from "./BaseEntity";
import {Column, Entity, ManyToOne} from "typeorm";
import {Question} from "./Question";

@Entity({name: "question_image"})
export class QuestionImage extends BaseEntity {

    @Column({type: "varchar", length: 1000})
    url: string;

    @ManyToOne(() => Question, (question: Question) => question.images)
    question: Question
}
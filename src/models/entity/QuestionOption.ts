import {Column, Entity, ManyToOne} from "typeorm";
import { BaseEntity } from "./BaseEntity";
import {Question} from "./Question";


@Entity()
export class QuestionOption extends BaseEntity {

    @Column()
    title: string;

    @Column()
    isAnswer: boolean;

    @Column({nullable: true})
    videoLink?: string;

    @ManyToOne(() => Question, (question:any) => question.options)
    question?: Question;
}
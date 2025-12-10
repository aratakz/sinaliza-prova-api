import {Column, Entity, JoinColumn, ManyToOne, OneToOne} from "typeorm";
import { BaseEntity } from "./BaseEntity";
import {Question} from "./Question";
import {Media} from "./Media";


@Entity()
export class QuestionOption extends BaseEntity {

    @Column()
    title: string;

    @Column()
    isAnswer: boolean;

    @Column({nullable: true})
    videoLink?: string;

    @ManyToOne(() => Question, (question:any) => question.options, {onDelete: "CASCADE"})
    question?: Question;

    @OneToOne(() => Media)
    @JoinColumn()
    media: Media;
}
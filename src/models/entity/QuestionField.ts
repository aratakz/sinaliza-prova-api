import {BaseEntity} from "./BaseEntity";
import {QuestionFieldType} from "../enums";
import {Column, Entity, ManyToOne} from "typeorm";
import {Question} from "./Question";

@Entity({ name: "question_field" })
export class QuestionField extends BaseEntity{

    @Column({
        type: 'enum',
        name: 'field_type',
        enum: QuestionFieldType,
        default: QuestionFieldType.none
    })
    fieldType: string;

    @Column({type: "varchar", length: 1000})
    fieldValue: string;

    @ManyToOne(() => Question, (question: Question) => question.fields)
    question: Question;

    @Column({type: "varchar", length: 1000})
    fieldVideo: string;

}
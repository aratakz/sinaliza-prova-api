import {BaseEntity} from "./BaseEntity";
import {QuestionFieldType} from "../enums";
import {Column, Entity, JoinColumn, ManyToOne, OneToOne} from "typeorm";
import {Question} from "./Question";
import {MediaRepository} from "../../repository/MediaRepository";
import {Media} from "./Media";

@Entity({ name: "question_field" })
export class QuestionField extends BaseEntity{

    @Column({
        type: 'enum',
        name: 'field_type',
        enum: QuestionFieldType,
        default: QuestionFieldType.none
    })
    fieldType: string;

    @Column({type: "varchar", length: 10000})
    fieldValue: string;

    @ManyToOne(() => Question, (question: Question) => question.fields, {onDelete: "CASCADE"})
    question: Question;

    @Column({type: "varchar", length: 1000, default: null})
    fieldVideo: string|null;

    @OneToOne(() =>Media)
    @JoinColumn()
    media: Media;


    async createAsTitle(questionDTO: any, question: Question) {
        this.fieldType = QuestionFieldType.title;
        this. fieldValue = questionDTO.title;
        this.question = question;
        return this;
    }
}
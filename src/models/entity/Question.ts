import {Column, Entity, OneToMany} from "typeorm";
import { BaseEntity } from "./BaseEntity";
import {QuestionField} from "./QuestionField";
import {QuestionImage} from "./QuestionImage";
import {QuestionOption} from "./QuestionOption";

@Entity()
export class Question extends BaseEntity {

    @Column({type: "varchar", length: 500})
    name: string;

    @OneToMany(() => QuestionField, (questionField) => questionField.question,  {onDelete: "CASCADE"})
    fields: QuestionField[];

    @OneToMany(() => QuestionImage, (questionImage) => questionImage.question,  {onDelete: "CASCADE"})
    images: QuestionImage[]

    @OneToMany(() => QuestionOption, (option) => option.question, {onDelete: "CASCADE"})
    options: QuestionOption[]
}
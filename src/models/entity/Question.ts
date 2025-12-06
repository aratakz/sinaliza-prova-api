import {Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany} from "typeorm";
import { BaseEntity } from "./BaseEntity";
import {QuestionField} from "./QuestionField";
import {QuestionOption} from "./QuestionOption";
import {QuestionTag} from "./QuestionTag";
import {Media} from "./Media";

@Entity()
export class Question extends BaseEntity {

    @Column({type: "varchar", length: 500})
    name: string;

    @OneToMany(() => QuestionField, (questionField) => questionField.question,  {onDelete: "CASCADE"})
    fields: QuestionField[];

    @OneToMany(() => QuestionOption, (option) => option.question, {onDelete: "CASCADE"})
    options: QuestionOption[]

    @ManyToMany(() => QuestionTag)
    @JoinTable()
    tags: QuestionTag[]

    @OneToMany(() => Media, (media) => media.question, {onDelete: "CASCADE"})
    media: Media[];
}
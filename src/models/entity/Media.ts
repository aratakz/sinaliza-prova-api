import {Column, Entity, JoinColumn, OneToOne} from "typeorm";
import {BaseEntity} from "./BaseEntity";
import {QuestionField} from "./QuestionField";

@Entity()
export class Media extends BaseEntity{

    @Column({type: 'longtext'})
    link: string;

    @OneToOne(() => QuestionField)
    @JoinColumn()
    field?: QuestionField;
}

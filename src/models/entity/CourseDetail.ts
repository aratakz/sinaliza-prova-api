import { Column, Entity } from "typeorm";
import { BaseEntity } from "./BaseEntity";

@Entity()
export class CourseDetail extends BaseEntity {

    @Column({type: "varchar", length: 255})
    courseName: string;

    @Column({type: "varchar", length: 500})
    description: String;
}
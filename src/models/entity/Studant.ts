import { BaseEntity, ChildEntity, Column, Entity } from "typeorm";
import { User } from "./User";


@ChildEntity("student")
export class Student extends  User {
    @Column({type: "date"})
    birthday: Date;
}
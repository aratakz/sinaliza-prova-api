import { Entity, Column, OneToMany, ChildEntity } from "typeorm";
import { BaseEntity } from "./BaseEntity";
import { User } from "./User";

@ChildEntity("professional")
export class Professional extends User {

    @Column({type: "boolean"})
    active: boolean = false;

    @Column({type: "boolean"})
    isSinaliza: boolean = false;

}
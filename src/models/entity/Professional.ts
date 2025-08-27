import { Entity, Column, OneToMany, ChildEntity } from "typeorm";
import { BaseEntity } from "./BaseEntity";
import { AuthToken } from "./AuthToken";
import { AccessProfile } from "../enums/AccessProfile";
import { User } from "./User";

@ChildEntity("professional")
export class Professional extends User {

    @Column({type: "varchar", length: 11})
    cpf: string;

    @Column({type: "boolean"})
    active: boolean = false;

    @Column({type: "enum", enum: AccessProfile})
    accessProfile: AccessProfile;

    @Column({type: "boolean"})
    isSinaliza: boolean = false;

}
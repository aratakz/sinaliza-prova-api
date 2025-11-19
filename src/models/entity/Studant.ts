import {ChildEntity, Column, Entity, JoinColumn, ManyToOne} from "typeorm";
import { User } from "./User";
import {Room} from "./Room";


@ChildEntity()
export class Student extends  User {
    @Column({type: "date"})
    birthday: Date;

    @ManyToOne(() => Room, {
        onDelete: 'CASCADE',
    })
    @JoinColumn({name: 'room_id'})
    room: Room|null
}
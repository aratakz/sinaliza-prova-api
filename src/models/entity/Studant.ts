import {BaseEntity, ChildEntity, Column, Entity, JoinColumn, ManyToOne} from "typeorm";
import { User } from "./User";
import {Room} from "./Room";


@ChildEntity("student")
export class Student extends  User {
    @Column({type: "date"})
    birthday: Date;

    @ManyToOne(() => Room, (room) => room.students, {
        onDelete: 'CASCADE',
    })
    
    @JoinColumn({name: 'room_id'})
    room: Room|null
}
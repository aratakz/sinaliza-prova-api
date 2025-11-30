import {ChildEntity, Column, Entity, JoinColumn, ManyToOne} from "typeorm";
import { User } from "./User";
import {Room} from "./Room";
import {UpdateUserDTO} from "../../dto";


@ChildEntity()
export class Student extends  User {
    @Column({type: "date"})
    birthday: Date;

    @ManyToOne(() => Room, {
        onDelete: 'CASCADE',
    })
    @JoinColumn({name: 'room_id'})
    room: Room|null

    async addRegisterData(input: UpdateUserDTO) {
        await super.addRegisterData(input);
        this.birthday = input.birthday;
    }
}
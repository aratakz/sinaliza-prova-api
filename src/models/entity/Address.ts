import { Column, Entity } from "typeorm";
import { BaseEntity } from "./BaseEntity";

@Entity()
export class Address extends BaseEntity {

    @Column({type: 'varchar'})
    street:string;

    @Column({type: 'varchar'})
    number: string;

    @Column({type: 'varchar'})
    neigborhood: string;

    @Column({type: 'text'})
    details: string;

    @Column({type: 'text'})
    reference: string;
}
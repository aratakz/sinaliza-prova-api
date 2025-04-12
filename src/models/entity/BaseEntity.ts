import { CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


export abstract class BaseEntity {
    
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @CreateDateColumn()
    generated: Date;

    @UpdateDateColumn()
    modified: Date;
}
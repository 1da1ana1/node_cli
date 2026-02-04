import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import crypto from "crypto";

@Entity("users")

class User{
    @PrimaryColumn()
    readonly id: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @CreateDateColumn()
    created_at: Date;

    constructor(){
        if(!this.id){
            this.id = crypto.randomUUID();
        }
    }

}

export { User };
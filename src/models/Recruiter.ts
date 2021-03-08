import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryColumn } from 'typeorm';
import {v4 as uuid} from 'uuid';
import bcrypt from 'bcryptjs';

@Entity('recruiters')
 class Recruiter{
    @PrimaryColumn()
    readonly id: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @BeforeInsert()
    @BeforeUpdate()
    hashPassword(){
        this.password = bcrypt.hashSync(this.password, 10);
    }

    constructor(){
        if(!this.id){
            this.id = uuid()
        }
    }
 } 
 export default Recruiter;

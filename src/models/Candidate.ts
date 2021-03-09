import { Column, Entity, PrimaryColumn, CreateDateColumn } from 'typeorm';
import {v4 as uuid} from 'uuid';

@Entity('candidates')
 class Candidate{
    @PrimaryColumn()
    readonly id: string;

    @Column()
    name: string;

    @Column()
    email: string;

    //date of birth - for age field
    @Column()
    dob: Date;

    @Column()
    linkedin: string;

    //text?
    @Column("simple-array", { array: true })
    techs: Array<string>;

    @CreateDateColumn()
    createdAt: Date;

    constructor(){
        if(!this.id){
            this.id = uuid()
        }
    }
 } 
 export default Candidate;

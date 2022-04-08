import {EntityModel} from "@midwayjs/orm";
import {Column, JoinColumn, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import User from "../user/user";

@EntityModel('wordle')
export default class Wordle{
  @PrimaryGeneratedColumn()
  id:number;

  @Column({
    type:'varchar',
    length:1024,
    nullable:false,
  })
  jsonString:string;
  @OneToOne(type => User,user => user.wordle)
  @JoinColumn({name:'staff_id',referencedColumnName:'staff_id'})
  user:User;
}

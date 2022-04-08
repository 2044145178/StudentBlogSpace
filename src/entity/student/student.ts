import {EntityModel} from "@midwayjs/orm";
import {Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";


@EntityModel('student')
export default class Student{
  @PrimaryGeneratedColumn({type:'bigint'})
  id:number;
  @Column({
    type:"varchar",
    length:10,
    nullable:false,
    unique:true,
  })
  staff_id:string;

  @Column({
    type:"varchar",
    length:255,
    nullable:false,
  })
  class_id:string;

  @CreateDateColumn({
    type:"timestamp",
  })
  created_at:Date;
  @UpdateDateColumn({
    type:'timestamp'
  })
  updated_at:Date;
}

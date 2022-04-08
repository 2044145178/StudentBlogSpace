import {EntityModel} from "@midwayjs/orm";
import {
  Column,
  CreateDateColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import Article from "../blog/article";
import AttendanceRecord from "../student/attendanceRecord";
import Wordle from "../student/wordle";

@EntityModel('user')
export default class User{
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
    length:20,
    nullable:false,
  })
  username:string;

  @Column({
    type:"char",
    length:32,
    nullable:false,
  })
  password:string;
  @CreateDateColumn({
    type:"timestamp",
  })
  created_at:Date;
  @UpdateDateColumn({
    type:'timestamp'
  })
  updated_at:Date;
  @Column({
    type:"varchar",
    length:255,
    nullable:true,
  })
  avatar:string;
  @Column({
    type:"tinyint",
    nullable:false,
  })
  role:number;
  @Column({
    type:"char",
    length:11,
    nullable:false,
  })
  phone:string;
  @Column({
    type:"text",
    nullable:true,
  })
  intro:string;
  @OneToMany(type => Article, article => article.user)
  articles:Article[];
  @OneToMany(type => AttendanceRecord, attendanceRecord => attendanceRecord.user )
  attendanceRecords:AttendanceRecord[];
  @OneToOne(type => Wordle,wordle => wordle.user)
  wordle:Wordle;
}

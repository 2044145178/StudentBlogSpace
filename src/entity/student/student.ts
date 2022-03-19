import {EntityModel} from "@midwayjs/orm";
import {Column, JoinColumn, OneToMany, OneToOne, PrimaryColumn} from "typeorm";
import Article from "../blog/article";
import AttendanceRecord from "./attendanceRecord";
import Wordle from "./wordle";

@EntityModel('student')
export default class Student{
  @PrimaryColumn('int')
  id:number;

  @Column({
    type:"varchar",
    length:20,
    nullable:false,
    unique:true,
  })
  username:string;

  @Column({
    type:"varchar",
    length:20,
    nullable:false,
  })
  password:string;

  @Column({
    type:"varchar",
    length:20,
    nullable:false,
  })
  name:string;

  @OneToMany(type => Article, article => article.student)
  articles:Article[];
  @OneToMany(type => AttendanceRecord, attendanceRecord => attendanceRecord.student )
  attendanceRecord:AttendanceRecord;
  @OneToOne(type => Wordle)
  @JoinColumn()
  wordle:Wordle;
}

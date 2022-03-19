import {EntityModel} from "@midwayjs/orm";
import {Column, CreateDateColumn, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import Student from "../student/student";
import Sort from "./sort";

@EntityModel('article')
export default class Article{
  @PrimaryGeneratedColumn()
  id:number;

  @Column({
    type:'varchar',
    length:256,
    nullable:false,
  })
  title:string

  @CreateDateColumn()
  created_at:Date;

  @UpdateDateColumn()
  updated_at:Date;

  @Column({
    type:'longtext',
    nullable:false
  })
  content:string;

  @Column()
  views:number;

  @Column()
  likes:number;

  @Column()
  show:boolean;

  @ManyToOne(type => Student,student =>student.articles)
  student:Student;
  @ManyToOne(type => Sort, sort => sort.articles)
  @JoinColumn()
  sort:Sort;

}

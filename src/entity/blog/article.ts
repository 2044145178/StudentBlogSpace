import {EntityModel} from "@midwayjs/orm";
import {Column, CreateDateColumn, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import Sort from "./sort";
import User from "../user/user";

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

  @ManyToOne(type => User,user =>user.articles)
  @JoinColumn({name:'staff_id',referencedColumnName:'staff_id'})
  user:User;
  @ManyToOne(type => Sort, sort => sort.articles)
  @JoinColumn()
  sort:Sort;
}

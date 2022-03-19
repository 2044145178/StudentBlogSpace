import {EntityModel} from "@midwayjs/orm";
import {Column, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import Article from "./article";

@EntityModel('sort')
export default class Sort{
  @PrimaryGeneratedColumn()
  id:number;

  @Column({
    type:'varchar',
    length:20,
    nullable:false,
    unique:true,
  })
  name:string;

  @Column({
    type:'text',
    nullable:true
  })
  description:string;

  @Column({
    type:'varchar',
    length:20,
    unique:true,
    nullable:true
  })
  alias:string;

  @OneToMany(type => Article, article => article.sort)
  articles:Article[];
}

import {EntityModel} from "@midwayjs/orm";
import {Column, PrimaryGeneratedColumn} from "typeorm";

@EntityModel('wordle')
export default class Wordle{
  @PrimaryGeneratedColumn()
  id:number;

  @Column({
    type:'varchar',
    length:1024,
    nullable:false,
  })
  imageUrl:string;

}

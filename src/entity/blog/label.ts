import {EntityModel} from "@midwayjs/orm";
import {Column, PrimaryGeneratedColumn} from "typeorm";

@EntityModel('label')
export default class Label{
  @PrimaryGeneratedColumn()
  id:number;
  @Column({
    type:'varchar',
    length:20,
    nullable:false,
    unique:true
  })
  name:string;
  @Column({
    type:'varchar',
    length:20,
    unique:true,
    nullable:true

  })
  alias:string;
  @Column({
    type:'text',
    nullable:true

  })
  description:string;

}

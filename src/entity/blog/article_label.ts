import {EntityModel} from "@midwayjs/orm";
import {Column, PrimaryGeneratedColumn} from "typeorm";

@EntityModel('article_label')
export default class ArticleLabel{
  @PrimaryGeneratedColumn()
  id:number;
  @Column()
  labelId:number;
  @Column()
  articleId:number;
}

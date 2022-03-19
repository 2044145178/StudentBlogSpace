import {EntityModel} from "@midwayjs/orm";
import {Column, PrimaryGeneratedColumn} from "typeorm";

@EntityModel('student_like_article')
export default class StudentLikeArticle{
  @PrimaryGeneratedColumn()
  id:number;
  @Column()
  studentId:number;
  @Column()
  articleId:number;
}

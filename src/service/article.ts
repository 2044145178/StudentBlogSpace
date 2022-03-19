import { Provide} from "@midwayjs/decorator";
import {InjectEntityModel} from "@midwayjs/orm";
import Article from "../entity/blog/article";
import {Repository} from "typeorm";
import {CreateArticleDto, DetailedArticleDto} from "../dto/blog/article";
import {isEmpty} from "lodash";
import {todetailedArticleDto,} from "./utils/entityTOdto";
import ArticleLabel from "../entity/blog/article_label";
import Label from "../entity/blog/label";
import Student from "../entity/student/student";
import Sort from "../entity/blog/sort";

@Provide()
export class ArticleService{
  @InjectEntityModel(Article)
  articleModel:Repository<Article>;
  @InjectEntityModel(Label)
  labelModel:Repository<Label>
  @InjectEntityModel(Student)
  studentModel:Repository<Student>
  @InjectEntityModel(Sort)
  sortModel:Repository<Sort>
  @InjectEntityModel(ArticleLabel)
  articleLabel:Repository<ArticleLabel>;
  async getArticleById(id:number):Promise<DetailedArticleDto|undefined>{
      const article =await this.articleModel.findOne({id:id});
      if (isEmpty(article)){
        return undefined;
      }
      const labels=await this.labelModel.createQueryBuilder("label")
        .innerJoin(ArticleLabel,'article_label','label.id=article_label.labelId')
        .innerJoinAndMapMany('label',Article,'article','article.id=article_label.articleId')
        .where('article.id=:id',{id:article.id})
        .getMany();
      return todetailedArticleDto(article,labels);
  }
  async addArticle(article:CreateArticleDto):Promise<boolean>{
    let flag=true;
    const student=await this.studentModel.findOne({id:article.studentId});
    if (isEmpty(student)){
      return false;
    }
    const sort=await this.sortModel.findOne({id:article.sortId});
    if (isEmpty(sort)){
      return false;
    }
    for (let i = 0; i < article.labelsId.length; i++) {
      const label=await this.labelModel.findOne({id:article.labelsId[i]});
      if (isEmpty(label)){
        return false;
      }
    }


    const articleRES=await this.articleModel.save({
      title:article.title,
      content:article.content,
      views:0,
      likes:0,
      show:article.show,
      student:student,
      sort:sort
    }).catch(reason => {flag=false,console.log(reason)});
    console.log(articleRES);
    for (let i = 0; i < article.labelsId.length; i++) {
      await this.articleLabel.save({articleId:(<Article>articleRES).id,labelId:article.labelsId[i]}).catch(reason => {
        console.log(reason);
        flag=false;
      });
    }

    return flag;
  }
}

import { Provide} from "@midwayjs/decorator";
import {InjectEntityModel} from "@midwayjs/orm";
import Article from "../entity/blog/article";
import {Repository} from "typeorm";
import {CreateArticleDto, DetailedArticleDto, UpdateArticleDto} from "../dto/blog/article";
import {isEmpty} from "lodash";
import {todetailedArticleDto,} from "./utils/entityTOdto";
import ArticleLabel from "../entity/blog/article_label";
import Label from "../entity/blog/label";
import Student from "../entity/student/student";
import Sort from "../entity/blog/sort";
import {selectNotNULL} from "./utils/utils";
import {LikeInfoDto, QueryListDto} from "../dto/common/Comm";
import StudentLikeArticle from "../entity/blog/student_like_article";

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
  @InjectEntityModel(StudentLikeArticle)
  studentLikeArticle:Repository<StudentLikeArticle>
  async addArticle(article:CreateArticleDto):Promise<boolean>{
    let flag=true;
    const student=await this.studentModel.findOne({id:article.studentId});
    if (isEmpty(student)){
      console.log('121')
      return false;
    }
    const sort=await this.sortModel.findOne({id:article.sortId});
    if (isEmpty(sort)){
      return false;
    }
    for (let i = 0; i < article.labelsId.length; i++) {
      const label=await this.labelModel.findOne({id:article.labelsId[i]});
      if (label===undefined){
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
    }).catch(reason => {
      flag=false;
      console.log(reason)});
    console.log(articleRES);
    for (let i = 0; i < article.labelsId.length; i++) {
      //待修改为事务处理
      await this.articleLabel.save({articleId:(<Article>articleRES).id,labelId:article.labelsId[i]}).catch(reason => {
        console.log(reason);
        flag=false;
      });
    }
    return flag;
  }
  async deleteArticleById(id:number):Promise<boolean>{
    let flag=true;
    const article=await this.articleModel.findOne({id:id}).catch(reason => {
      console.log(reason)
      flag=false;
    });
    if (article===undefined){
      flag=false;
    }
    if (flag){
      await this.articleModel.remove(<Article>article);
    }
    return flag;
  }
  async updateArticle(article:UpdateArticleDto):Promise<boolean>{
    let flag=true;
    const articleToUpdate=await this.articleModel.findOne({id:article.id}).catch(reason => {
      flag=false;
      console.log(reason)
    });
    if (articleToUpdate===undefined){
      flag=false;
    }
    if (flag){
      let sort=null;
      if (article.sortId!==undefined&&article.sortId!==null){
          sort=await this.sortModel.findOne({id:article.sortId}).catch(reason => {
          console.log(reason)
          flag=false;
        });
        if (sort===undefined){
          return false;
        }
      }
      if(article.labelsId!==null&&article.labelsId!==undefined){
        for (let i = 0; i < article.labelsId.length; i++) {
          const label=await this.labelModel.findOne({id:article.labelsId[i]});
          if (label===undefined){
            return false;
          }
        }
        for (let i = 0; i < article.labelsId.length; i++) {
          //待修改为事务处理
          await this.articleLabel.save({articleId:article.id,labelId:article.labelsId[i]}).catch(reason => {
            console.log(reason);
            flag=false;
          });
        }
      }
      (<Article>articleToUpdate).sort=selectNotNULL(sort,(<Article>articleToUpdate).sort);
      (<Article>articleToUpdate).show=selectNotNULL(article.show,(<Article>articleToUpdate).show);
      (<Article>articleToUpdate).content=selectNotNULL(article.content,(<Article>articleToUpdate).content);
      (<Article>articleToUpdate).title=selectNotNULL(article.title,(<Article>articleToUpdate).title);
      await this.articleModel.save(<Article>articleToUpdate);
    }
    return flag;
  }
  async getArticleById(aid:number,sid:number):Promise<DetailedArticleDto|null>{
    const article =await this.articleModel.findOne({relations:['sort','student'],where:{id:aid}});
    if (article===undefined){
      return null;
    }
    const labels=await this.labelModel.createQueryBuilder("label")
      .innerJoin(ArticleLabel,'article_label','label.id=article_label.labelId')
      .innerJoin(Article,'article','article.id=article_label.articleId')
      .where('article.id=:id',{id:article.id})
      .getMany();
    const detailedArticleDto:DetailedArticleDto=todetailedArticleDto(article,labels);
    const likeRES=await this.studentLikeArticle.findOne({studentId:sid,articleId:aid});
    console.log(likeRES)
    if (likeRES!==undefined){
      detailedArticleDto.liked=true;
    }else{
      detailedArticleDto.liked=false;
    }
    return detailedArticleDto;
  }
  async getArticles(queryListDto:QueryListDto):Promise<DetailedArticleDto[]|null>{
    let order;
    let flag=true;
    const detailedArticleDtoList=[];
    switch (queryListDto.sortCriteria) {
      case 'created_at':{order={created_at:-1}}break;
      case 'updated_at':{order={updated_at:-1}}break;
      case 'views':{order={views:-1}}break;
      case  'likes':{order={likes:-1}}break;
      default :{order={id:1}}break;
    }
    const articleList=await this.articleModel.find({
      order:order
      ,relations:['sort','student']
      ,take:selectNotNULL(queryListDto.limit,-1)
      ,skip:selectNotNULL(queryListDto.offset,0)
      ,}).catch(reason => {
      console.log(reason);
      flag=false;
    })
    if (!flag){
      return null;
    }
    for (let i = 0; i < (<Article[]>articleList).length; i++) {
      const labels=await this.labelModel.createQueryBuilder("label")
        .innerJoin(ArticleLabel,'article_label','label.id=article_label.labelId')
        .innerJoin(Article,'article','article.id=article_label.articleId')
        .where('article.id=:id',{id:articleList[i].id})
        .getMany();
      const detailedArticleDto:DetailedArticleDto=todetailedArticleDto(articleList[i],labels);
      const likeRES=await this.studentLikeArticle.findOne({studentId:queryListDto.studentId,articleId:articleList[i].id});
      if (likeRES!==undefined){
        detailedArticleDto.liked=true;
      }else{
        detailedArticleDto.liked=false;
      }
      detailedArticleDtoList.push(detailedArticleDto);
    }
    return detailedArticleDtoList;
    // const articleList=await this.articleModel
    //   .createQueryBuilder('article')
    //   .innerJoinAndMapMany('article.student',Student,'student','student.id=article.studentId')
    //   .innerJoinAndMapMany('article.sort',Sort,'sort','sort.id=article.sortId')
    //   .skip(selectNotNULL(comm.offset,0))
    //   .take(selectNotNULL(comm.limit,-1))
    //   .orderBy({
    //
    //   })
  }
  async addLike(likeInfoDto:LikeInfoDto):Promise<boolean>{
    const article=await this.articleModel.findOne({id:likeInfoDto.aid});
    if (article===undefined){
      return false;
    }
    const student=await this.studentModel.findOne({id:likeInfoDto.sid});
    if (student===undefined){
      return false;
    }
    const likeRES=await this.studentLikeArticle.findOne({articleId:likeInfoDto.aid,studentId:likeInfoDto.sid});
    if (likeRES===undefined){
      const likeRelation=new StudentLikeArticle()
      likeRelation.articleId=likeInfoDto.aid;
      likeRelation.studentId=likeInfoDto.sid;
      await this.studentLikeArticle.save(likeRelation);
      article.likes+=1;
      await this.articleModel.save(article);
    }else {
      await this.studentLikeArticle.remove(likeRES);
      article.likes-=1;
      await this.articleModel.save(article);
    }
    return true;
  }
  async addView(id:number):Promise<boolean>{
    const article=await this.articleModel.findOne({id:id});
    if (article===undefined){
      return false;
    }
    article.views+=1;
    await this.articleModel.save(article);
    return true;
  }
}

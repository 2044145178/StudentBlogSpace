import {Provide} from "@midwayjs/decorator";
import {InjectEntityModel} from "@midwayjs/orm";
import Student from "../entity/student/student";
import {CreateStudentDto, DetailedStudentDto, UpdateStudentDto} from "../dto/student/student";
import {Repository} from "typeorm";
import {selectNotNULL} from "./utils/utils";
import Article from "../entity/blog/article";
import Label from "../entity/blog/label";
import Sort from "../entity/blog/sort";
import ArticleLabel from "../entity/blog/article_label";
import {todetailedArticleDto, toDetailedStudentDto} from "./utils/entityTOdto";
import {QueryListDto} from "../dto/common/Comm";
import {DetailedArticleDto} from "../dto/blog/article";
import StudentLikeArticle from "../entity/blog/student_like_article";

@Provide()
export class StudentService {
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
  async addStudent(student:CreateStudentDto):Promise<boolean>{
    const stundet0=await this.studentModel.findOne({id:student.id});
    const student1=await this.studentModel.findOne({username:student.username});
    if (student1===undefined && stundet0===undefined){
      await this.studentModel.save({
        id:student.id,
        username:student.username,
        password:student.password,
        name:student.name,
        articles:[],
        attendanceRecords:[],
        wordle:null
      }).catch(reason => {
        console.log(reason)
        return false;
      })
      return true;
    }
    return false;
  }
  async updateStudent(student:UpdateStudentDto):Promise<boolean>{
    let flag=true;
    const studentToUpdate=await this.studentModel.findOne({id:student.id})
      .catch(reason => {
        flag=false;
        console.log(reason)
      });
    if (studentToUpdate===undefined){
      return false;
    }
    if (flag){
      (<Student>studentToUpdate).name=selectNotNULL(student.name,(<Student>studentToUpdate).name);
      (<Student>studentToUpdate).username=selectNotNULL(student.username,(<Student>studentToUpdate).username);
      (<Student>studentToUpdate).password=selectNotNULL(student.password,(<Student>studentToUpdate).password);
      await this.studentModel.save(<Student>studentToUpdate).catch(reason => {
        console.log(reason)
        flag=false;
      });
    }
    return flag;
  }
  async getStudentById(id:number,sid:number):Promise<DetailedStudentDto|null>{
    const student=await this.studentModel.findOne({relations:['attendanceRecords','wordle'],where:{id:id}})
    if (student===undefined){
      return null;
    }
    const articles=await this.articleModel.find({relations:['sort','student'],where:{student:student}})
    const detailedStudentDto=toDetailedStudentDto(student);
    const detailedArticleDtoList=[];
    detailedStudentDto.countLikes=0;
    detailedStudentDto.countViews=0;
    for (let i = 0; i <articles.length; i++) {
      detailedStudentDto.countLikes+=articles[i].likes;
      detailedStudentDto.countViews+=articles[i].views;
      const labels=await this.labelModel.createQueryBuilder("label")
        .innerJoin(ArticleLabel,'article_label','label.id=article_label.labelId')
        .innerJoin(Article,'article','article.id=article_label.articleId')
        .where('article.id=:id',{id:articles[i].id})
        .getMany();
      const detailedArticleDto:DetailedArticleDto=todetailedArticleDto(articles[i],labels);
      const likeRES=await this.studentLikeArticle.findOne({studentId:sid,articleId:articles[i].id});
      if (likeRES!==undefined){
        detailedArticleDto.liked=true;
      }else{
        detailedArticleDto.liked=false;
      }
      detailedArticleDtoList.push(detailedArticleDto);
    }
    detailedStudentDto.articles=detailedArticleDtoList;
    return detailedStudentDto;
  }
  async getStudents(queryListDto:QueryListDto):Promise<DetailedStudentDto[]|null>{
    let order;
    let flag=true;
    const detailedStudentDtoList:DetailedStudentDto[]=[];
    switch (queryListDto.sortCriteria) {
      case 'username':{order={username:-1}}break;
      case 'name':{order={name:-1}}break;
      case  'id':{order={id:-1}}break;
      default :{order={id:1}}break;
    }
    let studentList=await this.studentModel.find({
      order:order
      ,relations:['attendanceRecords','wordle']
      ,take:selectNotNULL(queryListDto.limit,-1)
      ,skip:selectNotNULL(queryListDto.offset,0)
      ,}).catch(reason => {
      console.log(reason);
      flag=false;
    })
    if (!flag){
      return null;
    }
    studentList=studentList as Student[]
    for (let i = 0; i < studentList.length; i++) {
      detailedStudentDtoList.push(toDetailedStudentDto(studentList[i]));
      const articles=await this.articleModel.find({relations:['sort','student'],where:{student:studentList[i]}})
      const detailedArticleDtoList=[];
      detailedStudentDtoList[i].countViews=0;
      detailedStudentDtoList[i].countLikes=0;
      for (let j = 0; j <articles.length; j++) {
        detailedStudentDtoList[i].countViews+=articles[j].views;
        detailedStudentDtoList[i].countLikes+=articles[j].likes;
        const labels=await this.labelModel.createQueryBuilder("label")
          .innerJoin(ArticleLabel,'article_label','label.id=article_label.labelId')
          .innerJoin(Article,'article','article.id=article_label.articleId')
          .where('article.id=:id',{id:articles[j].id})
          .getMany();
        const detailedArticleDto:DetailedArticleDto=todetailedArticleDto(articles[j],labels);
        const likeRES=await this.studentLikeArticle.findOne({studentId:queryListDto.studentId,articleId:articles[j].id});
        if (likeRES!==undefined){
          detailedArticleDto.liked=true;
        }else{
          detailedArticleDto.liked=false;
        }
        detailedArticleDtoList.push(detailedArticleDto);
      }
      detailedStudentDtoList[i].articles=detailedArticleDtoList;
    }
    return detailedStudentDtoList;
  }
}

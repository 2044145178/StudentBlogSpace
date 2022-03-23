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
  async getStudentById(id:number):Promise<DetailedStudentDto|null>{
    const student=await this.studentModel.findOne({relations:['attendanceRecords','wordle'],where:{id:id}})
    if (student===undefined){
      return null;
    }
    return null;
  }
}

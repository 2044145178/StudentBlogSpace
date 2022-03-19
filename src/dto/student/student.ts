import {Rule, RuleType} from "@midwayjs/validate";
import {DetailedArticleDto} from "../blog/article";
import {ApiProperty} from "@midwayjs/swagger";

export class BaseStudentDto{
  @ApiProperty({description:'学号',example:20051000})
  @Rule(RuleType.number().required())
  id:number;
  @ApiProperty({description:'用户名',example:'',minLength:3,maxLength:8})
  @Rule(RuleType.string().min(3).max(8).required())
  username:string;
  @ApiProperty({description:'学生姓名',example:'张三',minLength:2,maxLength:5})
  @Rule(RuleType.string().min(2).max(5).required())
  name:string;
}

export class CreateStudentDto {
  @ApiProperty({description:'学号',example:20051000})
  @Rule(RuleType.number().required())
  id:number;
  @ApiProperty({description:'用户名',example:'',minLength:3,maxLength:8})
  @Rule(RuleType.string().min(3).max(8).required())
  username:string;
  @ApiProperty({description:'学生姓名',example:'张三',minLength:2,maxLength:5})
  @Rule(RuleType.string().min(2).max(5).required())
  name:string;
  @ApiProperty({description:'密码',example:'123456'})
  @Rule(RuleType.string().min(8).max(16).required())
  password:string;

}
export class DetailedStudentDto {
  @ApiProperty({description:'学号',example:20051000})
  @Rule(RuleType.number().required())
  id:number;
  @ApiProperty({description:'用户名',example:'',minLength:3,maxLength:8})
  @Rule(RuleType.string().min(3).max(8).required())
  username:string;
  @ApiProperty({description:'学生姓名',example:'张三',minLength:2,maxLength:5})
  @Rule(RuleType.string().min(2).max(5).required())
  name:string;
  @ApiProperty({description:'学生总获赞数',example:0})
  @Rule(RuleType.number().required())
  countLikes:number;
  @ApiProperty({description:'学生总被浏览数',example:0})
  @Rule(RuleType.number().required())
  countViews:number;
  @ApiProperty({type:[DetailedArticleDto],description:'博文列表'})
  articles:DetailedArticleDto[];
}

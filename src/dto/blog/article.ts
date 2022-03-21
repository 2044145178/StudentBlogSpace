import { Rule, RuleType} from "@midwayjs/validate";
import {LabelDto} from "./label";
import {SortDto} from "./sort";
import {BaseStudentDto} from "../student/student";
import {ApiProperty} from "@midwayjs/swagger";

export class BaseArticleDto{

  @ApiProperty({description:'标题',example:'php为何号称天下第一'})
  @Rule(RuleType.string().required())
  title:string;

  @ApiProperty({description:'博文正文',example:'php天下第一。。。'})
  @Rule(RuleType.string().required())
  content:string;

  @ApiProperty({description:'是否公开展示',example:true})
  @Rule(RuleType.boolean().required())
  show:boolean;
}

export class CreateArticleDto {

  @ApiProperty({description:'标题',example:'php为何号称天下第一'})
  @Rule(RuleType.string().required())
  title:string;

  @ApiProperty({description:'博文正文',example:'php天下第一。。。'})
  @Rule(RuleType.string().required())
  content:string;

  @ApiProperty({description:'是否公开展示',example:true})
  @Rule(RuleType.boolean().required())
  show:boolean;

  @ApiProperty({description:'分类ID',example:1})
  @Rule(RuleType.number().required())
  sortId:number;

  @ApiProperty({type:[Number],description:'标签ID列表',example:[1,2]})
  @Rule(RuleType.array().empty())
  labelsId:number[];

  @ApiProperty({description:'学生学号',example:20051000})
  @Rule(RuleType.number().required())
  studentId:number;
}
export class DetailedArticleDto {
  @ApiProperty({description:'博文ID',example:'98'})
  @Rule(RuleType.number().required())
  id:number;
  @ApiProperty({description:'标题',example:'php为何号称天下第一'})
  @Rule(RuleType.string().required())
  title:string;

  @ApiProperty({description:'博文正文',example:'php天下第一。。。'})
  @Rule(RuleType.string().required())
  content:string;

  @ApiProperty({description:'是否公开展示',example:true})
  @Rule(RuleType.boolean().required())
  show:boolean;

  @ApiProperty({description:'博文浏览量',example:100})
  @Rule(RuleType.number().required())
  views:number;

  @ApiProperty({description:'博文点赞数',example:999})
  @Rule(RuleType.number().required())
  likes:number;

  @ApiProperty({description:'博文创建时间',example:'2022-10-10 00:00:00'})
  @Rule(RuleType.date().required())
  created_at:Date;

  @ApiProperty({description:'博文更新时间',example:'2022-10-10 00:00:00'})
  @Rule(RuleType.date().required())
  updated_at:Date;

  @ApiProperty({type:SortDto,description:'博文所属分类',example:'见SortDto'})
  @Rule(RuleType.object().required())
  sort:SortDto;

  @ApiProperty({type:[LabelDto],description:'标签列表',example:'见LabelDto'})
  @Rule(RuleType.array().empty())
  labels:LabelDto[];

  @ApiProperty({type:BaseStudentDto,description:'博文作者',example:'见BaseStudentDto'})
  @Rule(RuleType.object().required())
  student:BaseStudentDto;
}
export class UpdateArticleDto {
  @ApiProperty({description:'博文ID',example:'250'})
  @Rule(RuleType.number().required())
  id:number;
  @ApiProperty({description:'标题',example:'php为何号称天下第一'})
  @Rule(RuleType.string().required())
  title:string;

  @ApiProperty({description:'博文正文',example:'php天下第一。。。'})
  @Rule(RuleType.string().required())
  content:string;

  @ApiProperty({description:'是否公开展示',example:true})
  @Rule(RuleType.boolean().required())
  show:boolean;

  @ApiProperty({description:'分类ID',example:1})
  @Rule(RuleType.number().required())
  sortId:number;

  @ApiProperty({type:[Number],description:'标签ID列表',example:[1,2]})
  @Rule(RuleType.array().empty())
  labelsId:number[];
}

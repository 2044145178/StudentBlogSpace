import {Rule, RuleType} from "@midwayjs/validate";
import {DetailedArticleDto} from "../blog/article";
import {ApiProperty} from "@midwayjs/swagger";
import Wordle from "../../entity/student/wordle";
import AttendanceRecord from "../../entity/student/attendanceRecord";

export class BaseStudentDto{
  @ApiProperty({description:'学号',example:20051000})
  @Rule(RuleType.string().required())
  id:string;
  @ApiProperty({description:'用户名',example:'2004145asd',minLength:3,maxLength:8})
  @Rule(RuleType.string().min(3).max(16).required())
  username:string;
  // @ApiProperty({description:'学生姓名',example:'张三',minLength:2,maxLength:5})
  // @Rule(RuleType.string().min(2).max(5).required())
  // name:string;
}

export class CreateStudentDto {
  @ApiProperty({description:'学号',example:'20051000'})
  @Rule(RuleType.string().required())
  id:string;
  @ApiProperty({description:'用户名',example:'2004145asd',minLength:3,maxLength:8})
  @Rule(RuleType.string().min(3).max(16).required())
  username:string;
  // @ApiProperty({description:'学生姓名',example:'张三',minLength:2,maxLength:5})
  // @Rule(RuleType.string().min(2).max(5).required())
  // name:string;
  @ApiProperty({description:'密码',example:'12345678'})
  @Rule(RuleType.string().min(8).max(16).required())
  password:string;
}
export class DetailedStudentDto {
  @ApiProperty({description:'学号',example:'20051000'})
  @Rule(RuleType.string().required())
  id:string;
  @ApiProperty({description:'用户名',example:'2004145asd',minLength:3,maxLength:8})
  @Rule(RuleType.string().min(3).max(16).required())
  username:string;
  // @ApiProperty({description:'学生姓名',example:'张三',minLength:2,maxLength:5})
  // @Rule(RuleType.string().min(2).max(5).required())
  // name:string;
  @ApiProperty({description:'学生总获赞数',example:654})
  @Rule(RuleType.number().required())
  countLikes:number;
  @ApiProperty({description:'学生总被浏览数',example:201})
  @Rule(RuleType.number().required())
  countViews:number;
  @ApiProperty({description:'学生注册时间',example:1649332425})
  @Rule(RuleType.date().required())
  created_at:Date;
  @ApiProperty({type:[DetailedArticleDto],description:'博文列表'})
  articles:DetailedArticleDto[];
  @ApiProperty({type:Wordle,description:'词云',example:'{\n' +
      '      "id": 9,\n' +
      '      "jsonString": "[[\\"天下第一\\",2],[\\"php\\",1],[\\"java\\",1]]"\n' +
      '    }'})
  wordle:Wordle;
  @ApiProperty({
    type:[AttendanceRecord],
    description:'活跃度',
  })
  attendanceRecords:AttendanceRecord[];
  @ApiProperty({
    description:'头像url',
  })
  avatar:string;
  @ApiProperty({
    description:'个人简介',
  })
  intro:string;

}
export class UpdateStudentDto {
  @ApiProperty({description:'学号',example:'20051000'})
  @Rule(RuleType.string().required())
  id:string;
  @ApiProperty({description:'用户名',example:'2004145asd',minLength:3,maxLength:8})
  @Rule(RuleType.string().min(3).max(16).required())
  username:string;
  // @ApiProperty({description:'学生姓名',example:'张三',minLength:2,maxLength:5})
  // @Rule(RuleType.string().min(2).max(5).required())
  // name:string;
  @ApiProperty({description:'密码',example:'12345678'})
  @Rule(RuleType.string().min(8).max(16).required())
  password:string;
}
export class BaseAttendanceRecordDto{
  @ApiProperty({description:'学号',example:'20051000'})
  @Rule(RuleType.string().required())
  id:string;
}
export class UpdateAttendanceRecordDto{
  @ApiProperty({description:'学号',example:'20051000'})
  @Rule(RuleType.string().required())
  id:string;
  @ApiProperty({description:'要增加的活跃度',example:2})
  @Rule(RuleType.number().required())
  inc:number;
}

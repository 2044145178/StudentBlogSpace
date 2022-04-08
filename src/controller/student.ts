import {Body, Controller, Get, Inject, Put, Query} from "@midwayjs/decorator";
import {StudentService} from "../service/student";
import {Validate} from "@midwayjs/validate";
import {ApiBody, ApiQuery, ApiResponse} from "@midwayjs/swagger";
import {BaseAttendanceRecordDto, DetailedStudentDto, UpdateAttendanceRecordDto} from "../dto/student/student";
import {QueryListDto} from "../dto/common/Comm";
import {isEmpty} from "lodash";
import {res} from "../common/utils";
import {ResOp} from "../interface";
import {AttendanceRecordService} from "../service/attendanceRecord";

@Controller('/students')
export class StudentController {
  @Inject()
  studentService:StudentService;
  @Inject()
  attendanceRecordService:AttendanceRecordService;
  // @Validate()
  // @Post('/')
  // @ApiBody({
  //   type:CreateStudentDto,
  //   description:'注册用户,传入CreateStudentDto'
  // })
  // @ApiResponse({
  //   type:Boolean,
  //   description:'注册用户成功返回token,失败返回null'
  // })
  // async addStudent(@Body()student:CreateStudentDto):Promise<ResOp>{
  //   const result=await this.studentService.addStudent(student);
  //   return res({data:result,code:result?null:10501});
  // }
  // @Validate()
  // @Put('/')
  // @ApiResponse({
  //   description:'更新student,成功返回true',
  //   type:Boolean
  // })
  // @ApiBody({
  //   description:'修改学生信息，传入UpdateStudentDto中字段（可选）',
  //   type:UpdateStudentDto
  // })
  // async updateStudent(@Body()student:UpdateStudentDto):Promise<ResOp>{
  //   const result=await this.studentService.updateStudent(student);
  //   return res({data:result,code:result?null:20503});
  // }
  @Validate()
  @Get ('/')
  @ApiResponse({
    description:'成功可返回学生列表或单个学生，失败返回null',
    type:[DetailedStudentDto]
  })
  @ApiQuery({
    description:`\n获取学生列表\n
    limit:获取列表长度，-1为返回全部数据;(可选)\n
    offset:偏移值，指定获取的第一个数据的位置;(可选)\n
    sortCriteria:排序标准(可选)\n\n
    获取单个学生\n
    id:要查询的学生ID(学号)\n\n
    studentId:学生ID(必需)
    `,
    type:QueryListDto,
    name:'query',
    required:false
  })
  async getStudents(@Query()queryList:QueryListDto):Promise<ResOp>{
    console.log(queryList)
    if (queryList.id!==null&&queryList.id!==undefined){
      const student=await this.studentService.getStudentById(queryList.id,queryList.studentId);
      return res({data:student});
    }else if (!isEmpty(queryList)){
      const students=await this.studentService.getStudents(queryList);
      return res({data:students});
    }else{
      return res({code:20504});
    }
  }
  @Validate()
  @Get('/attendanceRecord')
  @ApiResponse({
    description:'查询今天是否打卡,已打卡返回true',
    type:Boolean
  })
  @ApiQuery({
    description:'查询今日是否打卡，传入BaseAttendanceRecordDto',
    type:BaseAttendanceRecordDto,
    name:'query'
  })
  async checkAttendanceRecord(@Query()baseAttendanceRecordDto:BaseAttendanceRecordDto):Promise<ResOp>{
    const result=await this.attendanceRecordService.checkAR(baseAttendanceRecordDto);
    return res({data:result});
  }
  @Validate()
  @Put('/attendanceRecord')
  @ApiResponse({
    description:'今日打卡,成功返回true',
    type:Boolean
  })
  @ApiBody({
    description:'今日打卡，传入UpdateAttendanceRecordDto',
    type:UpdateAttendanceRecordDto
  })
  async updateAttendanceRecord(@Body()updateAttendanceRecordDto:UpdateAttendanceRecordDto):Promise<ResOp>{
    const result=await this.attendanceRecordService.updateAR(updateAttendanceRecordDto);
    return res({data:result,code:result?null:10701});
  }
}

import {Body, Controller, Get, Inject, Post, Put, Query} from "@midwayjs/decorator";
import {StudentService} from "../service/student";
import {Validate} from "@midwayjs/validate";
import {ApiBody, ApiQuery, ApiResponse} from "@midwayjs/swagger";
import {CreateStudentDto, DetailedStudentDto, UpdateStudentDto} from "../dto/student/student";
import {QueryListDto} from "../dto/common/Comm";
import {isEmpty} from "lodash";

@Controller('/students')
export class StudentController {
  @Inject()
  studentService:StudentService;

  @Validate()
  @Post('/')
  @ApiBody({
    type:CreateStudentDto,
    description:'注册用户成功返回token,失败返回null'
  })
  async addStudent(@Body()student:CreateStudentDto):Promise<boolean|null>{
    return await this.studentService.addStudent(student);
  }
  @Validate()
  @Put('/')
  @ApiResponse({
    description:'更新student,成功返回true'
  })
  @ApiBody({
    description:'修改学生信息'
  })
  async updateStudent(@Body()student:UpdateStudentDto):Promise<boolean>{
    return await this.studentService.updateStudent(student);
  }
  @Validate()
  @Get ('/')
  @ApiResponse({
    description:'成功可返回学生列表或单个学生，失败返回null'
  })
  @ApiQuery({
    description:`\n获取学生列表\n
    limit:获取列表长度，-1为返回全部数据;\n
    offset:偏移值，指定获取的第一个数据的位置;\n
    sortCriteria:排序标准\n\n
    获取单个学生\n
    id:要查询的学生ID(学号)\n\n
    studentId:学生ID
    `,
    type:QueryListDto,
    name:'query',
    required:false
  })
  async getStudents(@Query()queryList:QueryListDto):Promise<DetailedStudentDto|DetailedStudentDto[]|null>{
    console.log(queryList)
    if (queryList.id!==null&&queryList.id!==undefined){
      return this.studentService.getStudentById(queryList.id,queryList.studentId);
    }else if (!isEmpty(queryList)){
      return this.studentService.getStudents(queryList);
    }else{
      return null;
    }
  }
}

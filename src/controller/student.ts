import {Body, Controller, Inject, Post, Put} from "@midwayjs/decorator";
import {StudentService} from "../service/student";
import {Validate} from "@midwayjs/validate";
import {ApiBody, ApiResponse} from "@midwayjs/swagger";
import {CreateArticleDto} from "../dto/blog/article";
import {CreateStudentDto, UpdateStudentDto} from "../dto/student/student";

@Controller('/student')
export class StudentController {
  @Inject()
  studentService:StudentService;

  @Validate()
  @Post('/')
  @ApiBody({
    type:CreateArticleDto,
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
  async updateStudent(@Body()student:UpdateStudentDto):Promise<boolean>{
    return await this.studentService.updateStudent(student);
  }
  // @Validate()
  // @Get ('/')
  // @ApiResponse({
  //   description:'成功可返回学生列表或单个学生，失败返回null'
  // })
  // @ApiQuery({
  //   description:`\n获取学生列表\n
  //   limit:获取列表长度，-1为返回全部数据;\n
  //   offset:偏移值，指定获取的第一个数据的位置;\n
  //   sortCriteria:排序标准\n\n
  //   获取单个学生\n
  //   id:学生ID(学号)
  //   `,
  //   type:QueryListDto,
  //   name:'query',
  //   required:false
  // })
  // async getStudents(@Query()queryList:QueryListDto):Promise<DetailedStudentDto|DetailedStudentDto[]|null>{
  //   console.log(queryList)
  //   if (queryList.id!==null&&queryList.id!==undefined){
  //     return this.studentService.getLabelById(queryList.id);
  //   }else if (!isEmpty(queryList)){
  //     return await this.labelService.getLabels(queryList);
  //   }else{
  //     return null;
  //   }
  // }
}

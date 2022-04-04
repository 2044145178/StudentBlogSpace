import {Body, Controller, Del, Get, Inject, Post, Put, Query} from "@midwayjs/decorator";
import {Validate} from "@midwayjs/validate";
import {ApiBody, ApiQuery, ApiResponse} from "@midwayjs/swagger";
import {CreateSortDto, SortDto} from "../dto/blog/sort";
import {SortService} from "../service/sort";
import {QueryListDto} from "../dto/common/Comm";
import {isEmpty} from "lodash";
import {res} from "../common/utils";
import {ResOp} from "../interface";

@Controller('/sorts')
export class SortController {
  @Inject()
  sortService:SortService;
  @Validate()
  @Post('/')
  @ApiResponse({
    description:'添加sort,成功返回true',
    type:Boolean
  })
  @ApiBody({
    description:'添加sort'
  })
  async addSort(@Body()sort:CreateSortDto):Promise<ResOp>{
    const result=await this.sortService.addSort(sort);
    return res({data:result,code:result?null:10401});
  }
  @Validate()
  @Del('/')
  @ApiResponse({
    description:'删除sort,成功返回true',
    type:Boolean
  })
  @ApiQuery({
    description:'删除分类，id为分类ID'
  })
  async deleteSortById(@Query('id')id:number):Promise<ResOp>{
    const result=await this.sortService.deleteSort(id);
    return res({data:result,code:result?null:20402});
  }
  @Validate()
  @Put('/')
  @ApiResponse({
    description:'修改sort,成功返回true',
    type:Boolean
  })
  @ApiBody({
    description:'修改分类'
  })
  async updateSort(@Body()sort:SortDto):Promise<ResOp>{
    const result=await this.sortService.updateSort(sort);
    return res({data:result,code:result?null:20403});
  }
  @Validate()
  @Get('/')
  @ApiResponse({
    description:'获取sort,成功返回SortDto',
    type:[SortDto]
  })
  @ApiQuery({
    description:`\n获取分类列表\n
    limit:获取列表长度，-1为返回全部数据;\n
    offset:偏移值，指定获取的第一个数据的位置;\n
    sortCriteria:排序标准\n\n
    获取单个分类\n
    id:分类ID\n\n
    studentId:学生ID
    `,
    type:QueryListDto,
    name:'query',
    required:false
  })
  async getSorts(@Query()queryList?:QueryListDto):Promise<ResOp>{
    console.log(queryList)
    if (queryList.id!==null&&queryList.id!==undefined){
      const sort=await this.sortService.getSortDtoById(queryList.id);
      return res({data:sort})
    }else if (!isEmpty(queryList)){
      const sorts=await this.sortService.getSorts(queryList);
      return res({data:sorts})
    }else{
      return res({code:20404});
    }
  }
}

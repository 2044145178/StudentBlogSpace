import {Body, Controller, Del, Get, Inject, Post, Put, Query} from "@midwayjs/decorator";
import {Validate} from "@midwayjs/validate";
import {ApiQuery, ApiResponse} from "@midwayjs/swagger";
import {CreateSortDto, SortDto} from "../dto/blog/sort";
import {SortService} from "../service/sort";
import {QueryListDto} from "../dto/common/comm";
import {isEmpty} from "lodash";

@Controller('/sorts')
export class SortController {
  @Inject()
  sortService:SortService;
  @Validate()
  @Post('/')
  @ApiResponse({
    description:'添加sort,成功返回true'
  })
  async addSort(@Body()sort:CreateSortDto):Promise<boolean>{
    return await this.sortService.addSort(sort);
  }
  @Validate()
  @Del('/')
  @ApiResponse({
    description:'删除sort,成功返回true'
  })
  @ApiQuery({
    description:'分类ID'
  })
  async deleteSortById(@Query('id')id:number):Promise<boolean>{
    return await this.sortService.deleteSort(id);
  }
  @Validate()
  @Put('/')
  @ApiResponse({
    description:'修改sort,成功返回true'
  })
  async updateSort(@Body()sort:SortDto):Promise<boolean>{
    return await this.sortService.updateSort(sort);
  }
  @Validate()
  @Get('/')
  @ApiResponse({
    description:'获取sort,成功返回SortDto'
  })
  @ApiQuery({
    description:`\n获取分类列表\n
    limit:获取列表长度，-1为返回全部数据;\n
    offset:偏移值，指定获取的第一个数据的位置;\n
    sortCriteria:排序标准\n\n
    获取单个分类\n
    id:分类ID
    `,
    type:QueryListDto,
    name:'query',
    required:false
  })
  async getSorts(@Query()queryList?:QueryListDto):Promise<SortDto|SortDto[]|null>{
    console.log(queryList)
    if (queryList.id!==null&&queryList.id!==undefined){
      return this.sortService.getSortDtoById(queryList.id);
    }else if (!isEmpty(queryList)){
      return await this.sortService.getSorts(queryList);
    }else{
      return null;
    }
  }
}

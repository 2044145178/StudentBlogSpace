import {Controller, Inject, Post, Del, Put, Get, Body, Query} from "@midwayjs/decorator";
import {LabelService} from "../service/label";
import {Validate} from "@midwayjs/validate";
import { ApiQuery, ApiResponse} from "@midwayjs/swagger";
import {CreateLabelDto, LabelDto} from "../dto/blog/label";
import { QueryListDto} from "../dto/common/comm";
import {isEmpty} from "lodash";

@Controller('/labels')
export class LabelController {
  @Inject()
  labelService:LabelService;
  @Validate()
  @Post('/')
  @ApiResponse({
    description:'添加label,成功返回true'
  })
  async addLabel(@Body()label:CreateLabelDto):Promise<boolean>{
    return await this.labelService.addLabel(label);
  }
  @Validate()
  @Del ('/')
  @ApiResponse({
    description:'通过labelID删除label,成功返回true'
  })
  @ApiQuery({
    description:'标签ID'
  })
  async deleteLabel(@Query('id')id:number):Promise<boolean>{
    return await this.labelService.deleteLabelById(id);
  }
  @Validate()
  @Put ('/')
  @ApiResponse({
    description:'更新label,成功返回true'
  })
  async updateLabel(@Body()label:LabelDto):Promise<boolean>{
    return await this.labelService.updateLabel(label);
  }
  @Validate()
  @Get ('/')
  @ApiResponse({
    description:'通过labelID查询label,成功返回Label'
  })
  @ApiQuery({
    description:`\n获取标签列表\n
    limit:获取列表长度，-1为返回全部数据;\n
    offset:偏移值，指定获取的第一个数据的位置;\n
    sortCriteria:排序标准\n\n
    获取单个标签\n
    id:标签ID
    `,
    type:QueryListDto,
    name:'query',
    required:false
  })
  async getLabels(@Query()queryList:QueryListDto):Promise<LabelDto|LabelDto[]|null>{
    console.log(queryList)
    if (queryList.id!==null&&queryList.id!==undefined){
      return this.labelService.getLabelById(queryList.id);
    }else if (!isEmpty(queryList)){
      return await this.labelService.getLabels(queryList);
    }else{
      return null;
    }
  }
}

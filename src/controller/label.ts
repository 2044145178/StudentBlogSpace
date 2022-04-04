import {Controller, Inject, Post, Del, Put, Get, Body, Query} from "@midwayjs/decorator";
import {LabelService} from "../service/label";
import {Validate} from "@midwayjs/validate";
import {ApiBody, ApiQuery, ApiResponse} from "@midwayjs/swagger";
import {CreateLabelDto, LabelDto} from "../dto/blog/label";
import { QueryListDto} from "../dto/common/Comm";
import {isEmpty} from "lodash";
import {res} from "../common/utils";
import {ResOp} from "../interface";

@Controller('/labels')
export class LabelController {
  @Inject()
  labelService:LabelService;
  @Validate()
  @Post('/')
  @ApiResponse({
    description:'添加label,成功返回true',
    type:Boolean
  })
  @ApiBody({
    description:'添加label'
  })
  async addLabel(@Body()label:CreateLabelDto):Promise<ResOp>{
    const result=await this.labelService.addLabel(label);
    return res({data:result,code:result?null:20301});
  }
  @Validate()
  @Del ('/')
  @ApiResponse({
    description:'通过labelID删除label,成功返回true',
    type:Boolean
  })
  @ApiQuery({
    description:'删除标签，id为标签ID'
  })
  async deleteLabel(@Query('id')id:number):Promise<ResOp>{
    const result=await this.labelService.deleteLabelById(id);
    return res({data:result,code:result?null:20302});
  }
  @Validate()
  @Put ('/')
  @ApiResponse({
    description:'更新label,成功返回true',
    type:Boolean
  })
  @ApiBody({
    description:'更新label'
  })
  async updateLabel(@Body()label:LabelDto):Promise<ResOp>{
    const result=await this.labelService.updateLabel(label);
    return res({data:result,code:result?null:20303})
  }
  @Validate()
  @Get ('/')
  @ApiResponse({
    description:'通过labelID查询label,成功返回Label',
    type:[LabelDto]
  })
  @ApiQuery({
    description:`\n获取标签列表\n
    limit:获取列表长度，-1为返回全部数据;\n
    offset:偏移值，指定获取的第一个数据的位置;\n
    sortCriteria:排序标准\n\n
    获取单个标签\n
    id:标签ID\n\n
    studentId:学生ID
    `,
    type:QueryListDto,
    name:'query',
    required:false
  })
  async getLabels(@Query()queryList:QueryListDto):Promise<ResOp>{
    console.log(queryList)
    if (queryList.id!==null&&queryList.id!==undefined){
      const label=await this.labelService.getLabelById(queryList.id);
      return res({data:label});
    }else if (!isEmpty(queryList)){
      const labels=await this.labelService.getLabels(queryList);
      return res({data:labels});
    }else{
      return res({code:20305});
    }
  }
}

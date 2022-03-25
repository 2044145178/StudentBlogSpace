import {Controller, Inject, Put, Query} from "@midwayjs/decorator";
import {WordleService} from "../../service/wordle";
import { ApiQuery, ApiResponse} from "@midwayjs/swagger";

@Controller('/wordle')
export class WordleController {
  @Inject()
  wordleService:WordleService;
  @Put('/')
  @ApiQuery({
    description:'更新学生词云，id为学生ID',
  })
  @ApiResponse({
    description:'更新成功返回true，失败返回false',
    type:Boolean
  })
  async updateWordleBySID(@Query('id')id:number):Promise<boolean>{
    return this.wordleService.updateWordle(id);
  }
}

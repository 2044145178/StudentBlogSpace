import {Controller, Inject, Put, Query} from "@midwayjs/decorator";
import {WordleService} from "../../service/wordle";
import {ApiProperty} from "@midwayjs/swagger";

@Controller('/wordle')
export class WordleController {
  @Inject()
  wordleService:WordleService;
  @Put('/')
  @ApiProperty({
    description:'更新学生词云，id为学生ID'
  })
  async updateWordleBySID(@Query('id')id:number):Promise<boolean>{
    return this.wordleService.updateWordle(id);
  }
}

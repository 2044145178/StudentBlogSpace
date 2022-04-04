import {Body, Controller, Del, Get, Inject, Post, Put, Query} from "@midwayjs/decorator";
import {ArticleService} from "../service/article";
import {ApiBody, ApiQuery, ApiResponse} from "@midwayjs/swagger";
import {CreateArticleDto, DetailedArticleDto, UpdateArticleDto} from "../dto/blog/article";
import {Validate} from "@midwayjs/validate";
import {LikeInfoDto, QueryListDto} from "../dto/common/Comm";
import {isEmpty} from "lodash";
import {res} from "../common/utils";
import {ResOp} from "../interface";

@Controller('/articles')
export class articleController {
  @Inject()
  articleService:ArticleService;
  @Validate()
  @Post('/')
  @ApiBody({
    type:CreateArticleDto,
    description:'添加博文,传入CreateArticleDto'
  })
  @ApiResponse({
    type:Boolean,
    description:'添加博文成功返回true'
  })
  async addArticle(@Body()article:CreateArticleDto):Promise<ResOp>{
    const result=await this.articleService.addArticle(article);
    return res({data:result,code:result?null:20201});
  }
  @Validate()
  @Del('/')
  @ApiResponse({
    description:'删除博文成功返回true',
  })
  @ApiQuery({
    description:'删除博文,id为博文ID'
  })
  async deleteArticleById(@Query('id')id:number):Promise<ResOp>{
    const result=await this.articleService.deleteArticleById(id);
    return res({data:result,code:result?null:20202});
  }
  @Validate()
  @Put('/')
  @ApiBody({
    type:UpdateArticleDto,
    description:'修改博文成功返回true'
  })
  @ApiResponse({
    description:'修改博文成功返回true',
    type:Boolean
  })
  async updateArticle(@Body()article:UpdateArticleDto):Promise<ResOp>{
    const result=await this.articleService.updateArticle(article);
    return res({data:result,code:result?null:20203});
  }
  @Validate()
  @Get('/')
  @ApiResponse({
    status: 200,
    description: '成功返回详细博文信息，失败返回null',
    type: [DetailedArticleDto],
  })
  @ApiQuery({
    description:`\n获取博文列表\n
    limit:获取列表长度，-1为返回全部数据;\n
    offset:偏移值，指定获取的第一个数据的位置;\n
    sortCriteria:排序标准\n\n
    获取单篇博文\n
    id:博文ID\n\n
    studentId:学生ID
    `,
    type:QueryListDto,
    name:'query',
    required:false
  })
  async getArticles(@Query()queryList:QueryListDto):Promise<ResOp>{
    if (queryList.id!==null&&queryList.id!==undefined){
      const article=await this.articleService.getArticleById(queryList.id,queryList.studentId);
      return res({data:article});
    }else if (!isEmpty(queryList)){
      const articles=await this.articleService.getArticles(queryList);
       return res({data:articles});
    }else{
      return res({code:20205});
    }
  }
  @Validate()
  @ApiResponse({
    description:'成功返回TRUE，失败返回false',
    type:Boolean
  })
  @ApiBody({
    description:'点赞博文'
  })
  @Put('/like')
  async changeLike(@Body()likeInfoDto:LikeInfoDto):Promise<ResOp>{
    const result=await this.articleService.addLike(likeInfoDto);
    return res({code:result?null:20206});
  }
  @Validate()
  @ApiResponse({
    description:'成功返回TRUE，失败返回false',
    type:Boolean
  })
  @ApiQuery({
    description:'id为博文ID，为博文增加一个访问量',
    example:4
  })
  @Put('/view')
  async addView(@Query('id')id:number):Promise<ResOp>{
    const result=await this.articleService.addView(id);
    return res({code:result?null:20207});
  }
}

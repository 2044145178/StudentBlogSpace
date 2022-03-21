import {Body, Controller, Del, Get, Inject, Post, Put, Query} from "@midwayjs/decorator";
import {ArticleService} from "../service/article";
import {ApiBody, ApiQuery, ApiResponse} from "@midwayjs/swagger";
import {CreateArticleDto, DetailedArticleDto, UpdateArticleDto} from "../dto/blog/article";
import {Validate} from "@midwayjs/validate";
import {QueryListDto} from "../dto/common/comm";
import {isEmpty} from "lodash";

@Controller('/articles')
export class articleController {
  @Inject()
  articleService:ArticleService;
  @Validate()
  @Post('/')
  @ApiBody({
    type:CreateArticleDto,
    description:'添加博文成功返回true'
  })
  async addArticle(@Body()article:CreateArticleDto):Promise<boolean>{
    return await this.articleService.addArticle(article);
  }
  @Validate()
  @Del('/')
  @ApiResponse({
    description:'删除博文成功返回true'
  })
  @ApiQuery({
    description:'博文ID'
  })
  async deleteArticleById(@Query('id')id:number):Promise<boolean>{
    return await this.articleService.deleteArticleById(id);
  }
  @Validate()
  @Put('/')
  @ApiBody({
    type:UpdateArticleDto,
    description:'修改博文成功返回true'
  })
  async updateArticle(@Body()article:UpdateArticleDto):Promise<boolean>{
    return await this.articleService.updateArticle(article);
  }
  @Validate()
  @Get('/')
  @ApiResponse({
    status: 200,
    description: '成功返回详细博文信息，失败返回null',
    type: DetailedArticleDto,
  })
  @ApiQuery({
    description:`\n获取博文列表\n
    limit:获取列表长度，-1为返回全部数据;\n
    offset:偏移值，指定获取的第一个数据的位置;\n
    sortCriteria:排序标准\n\n
    获取单篇博文\n
    id:博文ID
    `,
    type:QueryListDto,
    name:'query',
    required:false
  })
  async getArticles(@Query()queryList:QueryListDto):Promise<DetailedArticleDto|DetailedArticleDto[]|null>{
    console.log(queryList)
    if (queryList.id!==null&&queryList.id!==undefined){
      return this.articleService.getArticleById(queryList.id);
    }else if (!isEmpty(queryList)){
       return await this.articleService.getArticles(queryList);
    }else{
      return null;
    }
  }
}

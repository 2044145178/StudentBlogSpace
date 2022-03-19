import { Body, Controller, Get, Inject, Post, Query} from "@midwayjs/decorator";
import {ArticleService} from "../service/article";
import {ApiBody, ApiQuery, ApiResponse} from "@midwayjs/swagger";
import {CreateArticleDto, DetailedArticleDto} from "../dto/blog/article";
import {Validate} from "@midwayjs/validate";

@Controller('/articles')
export class articleController {
  @Inject()
  articleService:ArticleService;
  @ApiQuery({
    description:'获取详细博文，id为博文id',
  })
  @Validate()
  @Get('/')
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: DetailedArticleDto,
  })
  async getArticle(@Query('id')id:number):Promise<DetailedArticleDto>{
    return this.articleService.getArticleById(id);
  }
  @Validate()
  @Post('/')
  @ApiBody({
    type:CreateArticleDto,
    description:'添加博文成功返回true'
  })
  async addArticle(@Body()article:CreateArticleDto):Promise<boolean>{
    return this.articleService.addArticle(article);
  }
}

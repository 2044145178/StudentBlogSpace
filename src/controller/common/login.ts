import {Body, Controller, Get, Inject, Post} from "@midwayjs/decorator";
import {VerifyService} from "../../service/common/verify";
import {CaptchaCodeDto, CaptchaImgDto, LoginInfoDto, LoginSuccessInfoDto} from "../../dto/common/Comm";
import {Validate} from "@midwayjs/validate";
import {ApiBody, ApiQuery, ApiResponse} from "@midwayjs/swagger";
import {res} from "../../common/utils";
import {ResOp} from "../../interface";

@Controller('/login')
export class LoginController {
  @Inject()
  verifyService:VerifyService;
  @Validate()
  @Get('/captcha/img')
  @ApiResponse({
    description:'返回验证码图片',
    type:CaptchaImgDto,
  })
  @ApiQuery({
    description:'获取验证码图片'
  })
  async getCaptcha():Promise<ResOp>{
    const result=await this.verifyService.createCaptchaImg();
    return res({data:result,code:result?null:20201});
  }
  @Validate()
  @Post('/login.do')
  @ApiBody({
    description:'执行登录操作，传入LoginInfoDto',
    type:LoginInfoDto
  })
  @ApiResponse({
    description:'成功返回LoginSuccessInfoDto，失败返回null',
    type:LoginSuccessInfoDto
  })
  async login(@Body()loginInfoDto:LoginInfoDto):Promise<ResOp>{
    const captchaCodeDto=new CaptchaCodeDto();
    captchaCodeDto.id=loginInfoDto.captchaId;
    captchaCodeDto.code=loginInfoDto.verifyCode;
    if (!await this.verifyService.checkCaptcha(captchaCodeDto)){
        return res({code:10102});
    }
    const loginSuccessInfoDto=await this.verifyService.getLoginToken(loginInfoDto.username,loginInfoDto.password);
    return res({data:loginSuccessInfoDto,code:loginSuccessInfoDto?null:10103});
  }
}

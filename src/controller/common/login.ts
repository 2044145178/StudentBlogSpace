import {Body, Controller, Get, Inject, Post} from "@midwayjs/decorator";
import {VerifyService} from "../../service/common/verify";
import {CaptchaCodeDto, CaptchaImgDto, LoginInfoDto, LoginSuccessInfoDto} from "../../dto/common/Comm";
import {Validate} from "@midwayjs/validate";
import {ApiBody, ApiQuery, ApiResponse} from "@midwayjs/swagger";

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
  async getCaptcha():Promise<CaptchaImgDto>{
    return await this.verifyService.createCaptchaImg();
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
  async login(@Body()loginInfoDto:LoginInfoDto):Promise<LoginSuccessInfoDto|null>{
    const captchaCodeDto=new CaptchaCodeDto();
    captchaCodeDto.id=loginInfoDto.captchaId;
    captchaCodeDto.code=loginInfoDto.verifyCode;
    if (!this.verifyService.checkCaptcha(captchaCodeDto)){
        return null;
    }
    const loginSuccessInfoDto=this.verifyService.getLoginToken(loginInfoDto.username,loginInfoDto.password);
    return loginSuccessInfoDto;
  }
}

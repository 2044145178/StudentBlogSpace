import {Inject, Provide} from "@midwayjs/decorator";
import * as svgCaptcha from 'svg-captcha';
import {CaptchaCodeDto, CaptchaImgDto, LoginSuccessInfoDto} from "../../dto/common/Comm";
import {generateUUID} from "../../common/utils";
import {CacheManager} from "@midwayjs/cache";
import {InjectEntityModel} from "@midwayjs/orm";
import {Repository} from "typeorm";
import User from "../../entity/user/user";
@Provide()
export class VerifyService{
  @Inject()
  cacheManager:CacheManager;
  @InjectEntityModel(User)
  userModel:Repository<User>
  async createCaptchaImg():Promise<CaptchaImgDto>{
    const svg=svgCaptcha.create({
      size:4,
      ignoreChars:'0o1i',
      noise:2,
      color:true,
      background:'#cc9966'
    })
    console.log(svg.text)
    const result=new CaptchaImgDto();
    result.img=`data:image/svg+xml;base64,${Buffer.from(svg.data).toString('base64')}`;
    result.id=generateUUID();
    //5分钟内有效
    await this.cacheManager.set(`login:captcha:img:${result.id}`,svg.text,{ttl:60*5});
    return result;
  }
  async checkCaptcha(captchaCodeDto:CaptchaCodeDto):Promise<boolean>{
    const result=await this.cacheManager.get(`login:captcha:img:${captchaCodeDto.id}`);
    if (result===undefined){
      return false;
    }
    if (captchaCodeDto.code.toLowerCase()!==(<string>result).toLowerCase()){
      return false;
    }
    await this.cacheManager.del(`captcha:img:${captchaCodeDto.id}`);
    return true;
  }
  async getLoginToken(username: string, password: string):Promise<LoginSuccessInfoDto|null>{
    const user=await this.userModel.findOne({username:username});
    if (user===undefined){
      return null;
    }
    if ((<User>user).password!==password){
      return null;
    }
    const token=generateUUID();
    await this.cacheManager.set(`login:token:${username}`,token,{ttl:24*60*60});
    const loginSuccessInfoDto=new LoginSuccessInfoDto();
    loginSuccessInfoDto.token=token;
    loginSuccessInfoDto.id=user.id;
    loginSuccessInfoDto.username=user.username;
    return loginSuccessInfoDto;
  }
}

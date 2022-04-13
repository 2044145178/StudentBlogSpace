import {ApiProperty} from "@midwayjs/swagger";
import {Rule, RuleType} from "@midwayjs/validate";

export class QueryListDto {
  @ApiProperty({description:'学生ID',example:'20051000'})
  @Rule(RuleType.string().required())
  studentId:string;
  @ApiProperty({description:'资源ID，获取单个资源',example:'4'})
  @Rule(RuleType.number().empty())
  id:number;
  @ApiProperty({description:'获取列表长度，-1为返回全部数据',example:'10'})
  @Rule(RuleType.number().empty())
  limit:number;
  @ApiProperty({description:'偏移值，指定获取的第一个数据的位置',example:'0'})
  @Rule(RuleType.number().empty())
  offset:number;
  @ApiProperty({description:'排序标准,当前默认倒序',example:'id'})
  @Rule(RuleType.string().empty())
  sortCriteria:string;
}
export class CaptchaImgDto{
  @ApiProperty({description:'验证码ID',example:'id'})
  @Rule(RuleType.string().required())
  id:string;
  @ApiProperty({description:'验证码图片',example:'data:image/svg+xml;base64,xxxx'})
  @Rule(RuleType.string().required())
  img:string;
}
export class CaptchaCodeDto{
  @ApiProperty({description:'验证码ID',example:'id'})
  @Rule(RuleType.string().required())
  id:string;
  @ApiProperty({description:'四位验证码',example:'ak56'})
  @Rule(RuleType.string().required())
  code:string;
}
export class LoginInfoDto {
  @ApiProperty({description:'用户名', example:'204414512'})
  @Rule(RuleType.string().required())
  username: string;

  @ApiProperty({description:'密码',example:'12345678'})
  @Rule(RuleType.string().required())
  password: string;

  @ApiProperty({description:'验证码标识ID',example:'0CRq2jthWUp7DiLCftB-P'})
  @Rule(RuleType.string().required())
  captchaId: string;

  @ApiProperty({description:'登录验证码',example:'xfd4'})
  @Rule(RuleType.string().max(4).min(4).required())
  verifyCode: string;
}
export class LoginSuccessInfoDto{
  @ApiProperty({description:'学号ID', example:'20051000'})
  @Rule(RuleType.number().required())
  id: number;
  @ApiProperty({description:'用户名', example:'204414512'})
  @Rule(RuleType.string().required())
  username: string;
  // @ApiProperty({description:'学生姓名', example:'张三'})
  // @Rule(RuleType.string().required())
  // name: string;
  @ApiProperty({description:'token令牌', example:'0CRq2jsasd421thWUp7DiLCftB-P'})
  @Rule(RuleType.string().required())
  token: string;
}
export class LikeInfoDto {
  @ApiProperty({description:'学生ID', example:'20051000'})
  @Rule(RuleType.string().required())
  sid:string;
  @ApiProperty({description:'博文ID', example:'4'})
  @Rule(RuleType.number().required())
  aid:number;
}

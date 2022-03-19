import {Rule, RuleType} from "@midwayjs/validate";
import {ApiProperty} from "@midwayjs/swagger";

export class CreateLabelDto {
  @ApiProperty({description:'标签名',example:'简短',maxLength:20})
  @Rule(RuleType.string().max(20).required())
  name:string;
  @ApiProperty({description:'标签描述',example:'简单而短小',required:false})
  @Rule(RuleType.string().empty())
  description:string;
  @ApiProperty({description:'标签别名',example:'简略',required:false,maxLength:20})
  @Rule(RuleType.string().max(20).empty())
  alias:string;
}

export class LabelDto {
  @ApiProperty({description:'标签ID',example:2})
  @Rule(RuleType.number().required())
  id:number;
  @ApiProperty({description:'标签名',example:'简短',maxLength:20})
  @Rule(RuleType.string().max(20).required())
  name:string;
  @ApiProperty({description:'标签描述',example:'简单而短小',required:false})
  @Rule(RuleType.string().empty())
  description:string;
  @ApiProperty({description:'标签别名',example:'简略',required:false,maxLength:20})
  @Rule(RuleType.string().max(20).empty())
  alias:string;
}


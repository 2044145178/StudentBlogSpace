import {Rule, RuleType} from "@midwayjs/validate";
import {ApiProperty} from "@midwayjs/swagger";
export class CreateSortDto {
  @ApiProperty({description:'分类名',example:'编程',maxLength:20})
  @Rule(RuleType.string().max(20).required())
  name:string;
  @ApiProperty({description:'分类描述',example:'编程是编定程序的中文简称，就是让计算机代码解决某个问题，对某个计算体系规定一定的运算方式，使计算体系按照该计算方式运行，并最终得到相应结果的过程。',required:false})
  @Rule(RuleType.string().empty())
  description:string;
  @ApiProperty({description:'分类别名',example:'编码',required:false,maxLength:20})
  @Rule(RuleType.string().max(20).empty())
  alias:string;
}

export class SortDto {
  @ApiProperty({description:'分类ID',example:2})
  @Rule(RuleType.number().required())
  id:number;
  @ApiProperty({description:'分类名',example:'编程',maxLength:20})
  @Rule(RuleType.string().max(20).required())
  name:string;
  @ApiProperty({description:'分类描述',example:'编程是编定程序的中文简称，就是让计算机代码解决某个问题，对某个计算体系规定一定的运算方式，使计算体系按照该计算方式运行，并最终得到相应结果的过程。',required:false})
  @Rule(RuleType.string().empty())
  description:string;
  @ApiProperty({description:'分类别名',example:'编码',required:false,maxLength:20})
  @Rule(RuleType.string().max(20).empty())
  alias:string;
}

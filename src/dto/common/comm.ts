import {ApiProperty} from "@midwayjs/swagger";
import {Rule, RuleType} from "@midwayjs/validate";

export class QueryListDto {
  @ApiProperty({description:'博文ID，获取单篇博文',example:'2'})
  @Rule(RuleType.number().empty())
  id:number;
  @ApiProperty({description:'获取列表长度，-1为返回全部数据',example:'10'})
  @Rule(RuleType.number().empty())
  limit:number;
  @ApiProperty({description:'偏移值，指定获取的第一个数据的位置',example:'0'})
  @Rule(RuleType.number().empty())
  offset:number;
  @ApiProperty({description:'排序标准',example:'views'})
  @Rule(RuleType.string().empty())
  sortCriteria:string;
}

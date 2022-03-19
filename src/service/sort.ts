import {Provide} from "@midwayjs/decorator";
import {InjectEntityModel} from "@midwayjs/orm";
import Sort from "../entity/blog/sort";
import {Repository} from "typeorm";
import {SortDto} from "../dto/blog/sort";
import {isEmpty} from "lodash";


@Provide()
export class SortService {
  @InjectEntityModel(Sort)
  sortModel:Repository<Sort>
  async addSort(sort:Sort):Promise<boolean>{
    let flag=true;
    await this.sortModel.save(sort).catch(reason => {flag=false});
    return flag;
  }
  async getSortDtoById(id:number):Promise<SortDto|undefined>{
      const sort=await this.sortModel.findOne({id:id});
      if (isEmpty(sort)){
        return undefined;
      }
      const sortDto=new SortDto();
      sortDto.name=sort.name;
      sortDto.alias=sort.alias;
      sortDto.description=sort.description;
      return sortDto;
  }
}

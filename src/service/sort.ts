import {Provide} from "@midwayjs/decorator";
import {InjectEntityModel} from "@midwayjs/orm";
import Sort from "../entity/blog/sort";
import {Repository} from "typeorm";
import {CreateSortDto, SortDto} from "../dto/blog/sort";
import { tosortDto} from "./utils/entityTOdto";
import {QueryListDto} from "../dto/common/Comm";
import {selectNotNULL} from "./utils/utils";

@Provide()
export class SortService {
  @InjectEntityModel(Sort)
  sortModel:Repository<Sort>
  async addSort(sort:CreateSortDto):Promise<boolean>{
    let flag=true;
    await this.sortModel.save(sort).catch(reason => {
      console.log(reason)
      flag=false});
    return flag;
  }
  async deleteSort(id:number):Promise<boolean>{
    let flag=true;
    const sortToRemove=await this.sortModel.findOne({id:id}).catch(reason => {
      flag=false;
      console.log(reason)
    });
    if (sortToRemove===undefined){
      return false;
    }
    if (flag){
      await this.sortModel.remove(<Sort>sortToRemove)
    }
    return flag;
  }
  async updateSort(sort:SortDto):Promise<boolean>{
    let flag=true;
    const sortToUpdate=await this.sortModel.findOne({id:sort.id}).catch(reason => {
      console.log(reason)
      flag=false;
    });
    if (sortToUpdate===undefined){
      flag=false;
    }
    if (flag){
      (<Sort>sortToUpdate).name=selectNotNULL(sort.name,(<Sort>sortToUpdate).name);
      (<Sort>sortToUpdate).alias=selectNotNULL(sort.alias,(<Sort>sortToUpdate).alias);
      (<Sort>sortToUpdate).description=selectNotNULL(sort.description,(<Sort>sortToUpdate).description);
      await this.sortModel.save(<Sort>sortToUpdate);
    }
    return flag;
  }
  async getSortDtoById(id:number):Promise<SortDto|null>{
      const sort=await this.sortModel.findOne({id:id});
      if (sort===undefined){
        return null;
      }
      return tosortDto(sort);
  }
  async getSorts(queryListDto:QueryListDto):Promise<SortDto[]|null>{
    let order;
    let flag=true;
    switch (queryListDto.sortCriteria) {
      case 'id':{order={id:-1}}break;
      case 'name':{order={name:-1}}break;
      case 'alias':{order={alias:-1}}break;
      case  'description':{order={description:-1}}break;
      default :{order={id:1}}break;
    }
    const sortDtoList=await this.sortModel.find({take:selectNotNULL(queryListDto.limit,-1)
      ,skip:selectNotNULL(queryListDto.offset,0)
      ,order:order
    }).catch(reason => {
      console.log(reason);
      flag=false;
    });
    if (flag){
      return (<Sort[]>sortDtoList).map(tosortDto);
    }else{
      return null;
    }
  }
}

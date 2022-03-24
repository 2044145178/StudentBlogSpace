import {Provide} from "@midwayjs/decorator";
import {InjectEntityModel} from "@midwayjs/orm";
import Label from "../entity/blog/label";
import {Repository} from "typeorm";
import {isEmpty} from "lodash";
import {CreateLabelDto, LabelDto} from "../dto/blog/label";
import {tolabelDto} from "./utils/entityTOdto";
import {QueryListDto} from "../dto/common/Comm";
import {selectNotNULL} from "./utils/utils";

@Provide()
export class LabelService {
  @InjectEntityModel(Label)
  labelModel:Repository<Label>

  async addLabel(label:CreateLabelDto):Promise<boolean>{
    const labelRES=await this.labelModel.save(label);
    return !isEmpty(labelRES);
  }

  async deleteLabelById(id:number):Promise<boolean>{
    let flag=true;
    const labelToRemove = await this.labelModel.findOne({id:id});
    if (labelToRemove===undefined){
      return false;
    }
    await this.labelModel.remove(labelToRemove).catch(reason => {
      console.log(reason);
      flag=false})
    return flag;
  }

  async updateLabel(label:LabelDto):Promise<boolean>{
    let flag=true;
    const labelToUpdate=await this.labelModel.findOne({id:label.id}).catch(reason => {
      flag=false;
      console.log(reason)
    });
    if (labelToUpdate===undefined){
      return false;
    }
    if (flag){
      (<Label>labelToUpdate).name=selectNotNULL(label.name, (<Label>labelToUpdate).name);
      (<Label>labelToUpdate).alias=selectNotNULL(label.alias,(<Label>labelToUpdate).alias);
      (<Label>labelToUpdate).description=selectNotNULL(label.description,(<Label>labelToUpdate).description);
      await this.labelModel.save(<Label>labelToUpdate);
    }
    return flag;
  }

  async getLabelById(id:number):Promise<LabelDto|null>{
    let flag=true;
    const label=await this.labelModel.findOne({id:id}).catch(reason => {
      flag=false;
      console.log(reason)
    });
    if (label===undefined){
      flag=false;
    }
    if (!flag){
      return null;
    }
    return tolabelDto(<Label>label);
  }
  async getLabels(queryListDto:QueryListDto):Promise<LabelDto[]|null>{
    let order;
    let flag=true;
    switch (queryListDto.sortCriteria) {
      case 'id':{order={id:-1}}break;
      case 'name':{order={name:-1}}break;
      case 'alias':{order={alias:-1}}break;
      case  'description':{order={description:-1}}break;
      default :{order={id:1}}break;
    }
    const labelDtoList=await this.labelModel.find({take:selectNotNULL(queryListDto.limit,-1)
      ,skip:selectNotNULL(queryListDto.offset,0)
      ,order:order
    }).catch(reason => {
      console.log(reason);
      flag=false;
    });
    if (flag){
      return (<Label[]>labelDtoList).map(tolabelDto);
    }else{
      return null;
    }
  }
}

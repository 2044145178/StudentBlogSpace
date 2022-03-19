import {Provide} from "@midwayjs/decorator";
import {InjectEntityModel} from "@midwayjs/orm";
import Label from "../entity/blog/label";
import {Repository} from "typeorm";
import {isEmpty} from "lodash";
import {LabelDto} from "../dto/blog/label";
import {tolabelDto} from "./utils/entityTOdto";

@Provide()
export class LabelService {
  @InjectEntityModel(Label)
  labelModel:Repository<Label>

  async getLabelById(id:number):Promise<LabelDto|null>{
    const label=await this.labelModel.findOne({id:id});
    if (isEmpty(label)){
      return null;
    }
    const labelDto=tolabelDto(label);
    return labelDto;
  }
}

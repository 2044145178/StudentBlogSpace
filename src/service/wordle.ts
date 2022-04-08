import {Provide} from "@midwayjs/decorator";
import {InjectEntityModel} from "@midwayjs/orm";
import {Repository} from "typeorm";
import Wordle from "../entity/student/wordle";
import * as jieba from '@node-rs/jieba';
import Article from "../entity/blog/article";
import constant from "../common/common_constants";
import User from "../entity/user/user";
@Provide()
export class WordleService {
  @InjectEntityModel(Wordle)
  wordleModel:Repository<Wordle>
  @InjectEntityModel(User)
  studentModel:Repository<User>
  @InjectEntityModel(Article)
  articleModel:Repository<Article>
  async updateWordle(id:number):Promise<boolean>{
    const student:User=await this.studentModel.findOne({relations:['wordle'],where:{staff_id:id}});
    let wordle;
    if (student===undefined){
      return false;
    }
    if (student.wordle===undefined||student.wordle===null){
      wordle=undefined;
    }else{
      wordle=await this.wordleModel.findOne({id:student.wordle.id});
    }
    console.log(wordle)
    const articles=await this.articleModel.find({user:student});
    const mapRES=new Map();
    for (let i = 0; i < articles.length; i++) {
      let sentence=articles[i].content;
      sentence=sentence.replace(constant.symbolReg,' ');
      const jiebaRES=jieba.cut(sentence);
      const tmpRES=[];
      for (let j = 0; j < jiebaRES.length; j++) {
        if (jiebaRES[j]!==' '){
          tmpRES.push(jiebaRES[j]);
        }
      }
      for (let j = 0; j < tmpRES.length; j++) {
        if (mapRES.has(tmpRES[j])){
          mapRES.set(tmpRES[j],mapRES.get(tmpRES[j])+1)
        }else{
          mapRES.set(tmpRES[j],1);
        }
      }
    }
    let arr=Array.from(mapRES);
    arr.sort((a,b)=>b[1]-a[1])
    console.log(arr)
    arr=arr.slice(0,50)
    let newWordle;
    if (wordle===undefined){
      newWordle=await this.wordleModel.save({jsonString:JSON.stringify(arr)})
    }else {
      wordle.jsonString=JSON.stringify(arr)
      newWordle=await this.wordleModel.save(wordle)
    }
    student.wordle=newWordle;
    await this.studentModel.save(student)
    return true;
  }
}

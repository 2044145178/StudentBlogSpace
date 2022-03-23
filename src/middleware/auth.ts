import {Inject, Middleware} from "@midwayjs/decorator";
import {IMiddleware} from "@midwayjs/core";
import {Context,NextFunction} from "@midwayjs/koa";
import {HttpService} from "@midwayjs/axios";

@Middleware()
export class AuthMiddleware implements IMiddleware<Context, NextFunction>{
  @Inject()
  httpService:HttpService
    resolve(){
      return async (ctx:Context,next:NextFunction)=>{
        const token=ctx.get('Authorization')
        const studentId=ctx.cookies.get('studentId');
        let flag=true;
        if (token===undefined||token===null||studentId===undefined||studentId===null){
            return;
        }
        await this.httpService.post('/v1/authorization/validate',{
          Authorization:token,
          AssignTo:studentId
        }).then(res=>{
          flag=res.data;
          console.log(res.data);
        })
        if (!flag){
          return;
        }
        await next();
      }
    }
}

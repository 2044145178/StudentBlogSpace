import {Middleware} from "@midwayjs/decorator";
import {IMiddleware} from "@midwayjs/core";
import {NextFunction,Context} from "@midwayjs/koa";

@Middleware()
export class AdminAuthMiddleware implements IMiddleware<Context, NextFunction>{
  resolve() {
    return async (ctx:Context,next:NextFunction)=>{
        const studentId=Number.parseInt(ctx.cookies.get('studentId'));
        if (studentId!==20051400){
          return;
        }
        await next();
    }
  }

}

import { Provide} from "@midwayjs/decorator";
import {InjectEntityModel} from "@midwayjs/orm";
import AttendanceRecord from "../entity/student/attendanceRecord";
import {Repository} from "typeorm";
import {BaseAttendanceRecordDto, UpdateAttendanceRecordDto} from "../dto/student/student";
import User from "../entity/user/user";

@Provide()
export class AttendanceRecordService {
  @InjectEntityModel(AttendanceRecord)
  attendanceRecordModel:Repository<AttendanceRecord>
  async createAR(baseAttendanceRecordDto:BaseAttendanceRecordDto):Promise<boolean>{
    const res=await this.attendanceRecordModel
      .createQueryBuilder("AR")
      .where("to_days(AR.created_at)=to_days(now())")
      .andWhere("AR.staff_id= :staff_id")
      .setParameter("staff_id",baseAttendanceRecordDto.id)
      .getOne()
    console.log(res)
    if (res!==undefined && res!==null){
      return false;
    }
    const ar=new AttendanceRecord();
    const user=new User();
    user.staff_id=baseAttendanceRecordDto.id;
    ar.user=user;
    ar.activation=1;
    const arRES=await this.attendanceRecordModel.save(ar);
    console.log(arRES)
    return true;
  }
  async checkAR(baseAttendanceRecordDto:BaseAttendanceRecordDto):Promise<boolean>{
    const res=await this.attendanceRecordModel
      .createQueryBuilder("AR")
      .where("to_days(AR.created_at)=to_days(now())")
      .andWhere("AR.staff_id= :staff_id")
      .setParameter("staff_id",baseAttendanceRecordDto.id)
      .getOne()
    if (res!==undefined && res!==null){
      return true;
    }
    return false;
  }
  async updateAR(updateAttendanceRecordDto:UpdateAttendanceRecordDto):Promise<boolean>{
    const res=await this.attendanceRecordModel
      .createQueryBuilder("AR")
      .where("to_days(AR.created_at)=to_days(now())")
      .andWhere("AR.staff_id= :staff_id")
      .setParameter("staff_id",updateAttendanceRecordDto.id)
      .getOne()
    if (res===undefined || res===null){
      const ar=new AttendanceRecord();
      const user=new User();
      user.staff_id=updateAttendanceRecordDto.id;
      ar.user=user;
      ar.activation=updateAttendanceRecordDto.inc;
      const arRES=await this.attendanceRecordModel.save(ar);
      console.log(arRES);
      return true;
    }
    res.activation+=updateAttendanceRecordDto.inc;
    await this.attendanceRecordModel.save(res);
    return true;
  }
}

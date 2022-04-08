import {EntityModel} from "@midwayjs/orm";
import {Column, CreateDateColumn, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import User from "../user/user";

@EntityModel('attendance_record')
export default class AttendanceRecord{
  @PrimaryGeneratedColumn()
  id:number;
  @CreateDateColumn()
  created_at:Date;
  @UpdateDateColumn()
  updated_at:Date;
  @Column({
    type:'int',
    nullable:false
  })
  activation:number;
  @ManyToOne(type => User, user=>user.attendanceRecords)
  @JoinColumn({name:'staff_id',referencedColumnName:'staff_id'})
  user:User;
}

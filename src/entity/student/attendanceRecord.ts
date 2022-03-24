import {EntityModel} from "@midwayjs/orm";
import { CreateDateColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import Student from "./student";

@EntityModel('attendance_record')
export default class AttendanceRecord{
  @PrimaryGeneratedColumn()
  id:number;
  @CreateDateColumn()
  date:Date;
  @ManyToOne(type => Student, student=>student.attendanceRecords)
  student:Student;
}

import {Provide} from "@midwayjs/decorator";
import {InjectEntityModel} from "@midwayjs/orm";
import Student from "../entity/student/student";
import {DetailedStudentDto} from "../dto/student/student";
import {Repository} from "typeorm";

@Provide()
export class StudentService {
  @InjectEntityModel(Student)
  studentModel:Repository<Student>;
  async getStudentById(id:number):Promise<DetailedStudentDto|null>{
    return null;
  }
}

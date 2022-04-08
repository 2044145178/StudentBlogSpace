import Sort from "../../entity/blog/sort";
import {SortDto} from "../../dto/blog/sort";
import Article from "../../entity/blog/article";
import {DetailedArticleDto} from "../../dto/blog/article";
import {BaseStudentDto, DetailedStudentDto} from "../../dto/student/student";
import {LabelDto} from "../../dto/blog/label";
import Label from "../../entity/blog/label";
import User from "../../entity/user/user";

export function tosortDto(sort:Sort):SortDto {
  const sortDto=new SortDto();
  sortDto.id=sort.id;
  sortDto.name=sort.name;
  sortDto.alias=sort.alias;
  sortDto.description=sort.description;
  return sortDto;
}
export function tolabelDto(label:Label):LabelDto {
  const labelDto=new LabelDto();
  labelDto.id=label.id;
  labelDto.name=label.name;
  labelDto.alias=label.alias;
  labelDto.description=label.description;
  return labelDto;
}
export function tobaseStudentDto(user:User): BaseStudentDto{
  const baseStudentDto=new BaseStudentDto();
  baseStudentDto.id=user.staff_id;
  baseStudentDto.username=user.username;
  return baseStudentDto;
}
export function todetailedArticleDto(article:Article,labels:Label[]|null):DetailedArticleDto {
  const detailedArticleDto=new DetailedArticleDto();
  detailedArticleDto.id=article.id;
  detailedArticleDto.sort=tosortDto(article.sort);
  detailedArticleDto.title=article.title;
  detailedArticleDto.likes=article.likes;
  detailedArticleDto.created_at=article.created_at;
  detailedArticleDto.updated_at=article.updated_at;
  detailedArticleDto.views=article.views;
  detailedArticleDto.content=article.content;
  detailedArticleDto.show=article.show;
  detailedArticleDto.student=tobaseStudentDto(article.user);
  const labelDtos=labels.map(tolabelDto);
  detailedArticleDto.labels=labelDtos;
  return detailedArticleDto;
}
export function toDetailedStudentDto(student:User):DetailedStudentDto {
  const detailedStudentDto=new DetailedStudentDto();
  detailedStudentDto.id=student.staff_id;
  detailedStudentDto.username=student.username;
  detailedStudentDto.wordle=student.wordle;
  detailedStudentDto.attendanceRecords=student.attendanceRecords;
  return detailedStudentDto;
}

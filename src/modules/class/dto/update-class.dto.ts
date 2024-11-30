import { IsDate, IsNumber, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateClassDto {

  @IsString()
  name: string;

  @IsString()
  schedule_days:string;

  @IsDate()
  @Type(() => Date)
  lesson_start:Date;

  @IsDate()
  @Type(() => Date)
  lesson_finish:Date;

  @IsNumber()
  room:number;

  @IsNumber()
  teacherId:number;

}
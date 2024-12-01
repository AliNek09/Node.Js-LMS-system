import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateClassDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  schedule_days: string;

  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  lesson_start: Date;

  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  lesson_finish: Date;

  @IsNotEmpty()
  @IsString()
  place: string;

  @IsNotEmpty()
  @IsNumber()
  teacherId: number;

}
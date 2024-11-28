import { IsDate, IsNotEmpty, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateTeacherDto
{
  @IsString()
  username: string;

  @IsString()
  first_name: string;

  @IsString()
  last_name: string;

  @IsString()
  password: string;

  @IsDate()
  @Type(() => Date) // Ensures the value is transformed into a Date object
  created_at: Date;

  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  updated_at: Date;
}
import { IsDate, IsNotEmpty, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateTeacherDto
{
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  first_name: string;

  @IsNotEmpty()
  @IsString()
  last_name: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsDate()
  @Type(() => Date) // Ensures the value is transformed into a Date object
  created_at: Date;

  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  updated_at: Date;
}
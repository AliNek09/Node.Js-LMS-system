import { IsNotEmpty, IsString, IsNumber, IsArray, IsDate } from "class-validator";

export class CreateAssignmentDto
{

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsDate()
  deadline: Date;

  @IsNotEmpty()
  @IsNumber()
  classId: number;

  @IsNotEmpty()
  @IsNumber()
  topicId: number;

  @IsNotEmpty()
  @IsArray()
  @IsNumber({}, {each: true})
  problemIds: number[];

}
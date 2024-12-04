import { IsString, IsNumber, IsArray, IsDate } from "class-validator";

export class UpdateAssignmentDto
{
  @IsString()
  description: string;

  @IsDate()
  date: Date;

  @IsNumber()
  classId: number;

  @IsNumber()
  topicId: number;

  @IsArray()
  @IsNumber({}, {each: true})
  problemIds: number[];
}
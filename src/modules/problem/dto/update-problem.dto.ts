import { IsString, IsNumber } from "class-validator";

export class UpdateProblemDto
{

  @IsNumber()
  order: number;

  @IsString()
  answer: string;

  @IsNumber()
  topicId: number;

}
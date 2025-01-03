import { IsString, IsNumber, IsJSON } from "class-validator";

export class UpdateProblemDto
{

  @IsNumber()
  order: number;

  @IsJSON()
  answer: any; // Refactored to validate JSON format

  @IsNumber()
  topicId: number;

}
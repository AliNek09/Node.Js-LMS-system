import { IsNotEmpty, IsString, IsNumber, IsJSON } from "class-validator";

export class CreateProblemDto
{

  @IsNumber()
  @IsNotEmpty()
  order: number;

  @IsJSON()
  @IsNotEmpty()
  answer: any;  // Refactored to validate JSON format

  @IsNumber()
  @IsNotEmpty()
  topicId: number;
}
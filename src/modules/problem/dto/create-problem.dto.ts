import { IsNotEmpty, IsString, IsNumber } from "class-validator";

export class CreateProblemDto
{
  @IsNumber()
  @IsNotEmpty()
  order: number;

  @IsString()
  @IsNotEmpty()
  answer: string;

  @IsNumber()
  @IsNotEmpty()
  topicId: number;
}
import { IsNotEmpty, IsString, IsNumber } from "class-validator";

export class CreateTopicDto
{
  @IsNotEmpty()
  @IsNumber()
  topic_number: number;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;
}
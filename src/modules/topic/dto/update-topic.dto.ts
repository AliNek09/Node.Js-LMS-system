import  { IsString, IsNumber } from "class-validator";

export class UpdateTopicDto
{
  @IsNumber()
  topic_number: number;

  @IsString()
  title: string;

  @IsString()
  description: string;

}
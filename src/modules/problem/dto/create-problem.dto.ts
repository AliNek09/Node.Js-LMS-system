import { IsNotEmpty, IsString, IsArray, IsNumber, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

class PlaceholderDto
{
  @IsNumber()
  @IsNotEmpty()
  index: number;

  @IsString()
  @IsNotEmpty()
  answer: string;
}

export class CreateProblemDto
{
  @IsNumber()
  @IsNotEmpty()
  order: number;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsArray()
  @IsNotEmpty()
  text: string[];

  @ValidateNested({each: true})
  @Type(() => PlaceholderDto)
  placeholders: PlaceholderDto[];

  @IsNumber()
  @IsNotEmpty()
  topicId: number;
}
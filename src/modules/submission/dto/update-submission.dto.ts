import { IsArray, IsOptional, IsNumber, ValidateNested, IsNotEmpty } from "class-validator";
import { Type } from 'class-transformer';

class SubmissionFieldDto {
  @IsNotEmpty()
  @IsNumber()
  index: number;

  @IsNotEmpty()
  value: string;
}
class ProblemAnswerDto {
  @IsNotEmpty()
  @IsNumber()
  problemId: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SubmissionFieldDto)
  fields: SubmissionFieldDto[];
}

export class UpdateSubmissionDto {
  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => ProblemAnswerDto)
  answer: ProblemAnswerDto[];

  @IsOptional()
  @IsNumber()
  score: number;

  @IsNotEmpty()
  @IsNumber()
  assignmentId: number;

  @IsNotEmpty()
  @IsNumber()
  studentsId: number; // Corrected from studentsId
}
import { Problem } from '../../entities/problem.entity';
import { AppException } from '../exceptions/exception';
import {create, all} from 'mathjs';
const math = create(all, {});

export class MathExpression
{

  static compareAnswers(correctValue: any, submittedValue: any): boolean
  {
    // Handle null or undefined values
    if (correctValue == null || submittedValue == null) {
      return false;
    }

    return math.evaluate(`${submittedValue} == ${correctValue}`);
  }

  static calculateScore(submittedAnswers: any[], problems: Problem[]): number {
    let totalCorrectFields = 0;
    let totalFields = 0;
    let submittedProblemsLength = 0;
    // Process each submitted answer against the original problems (not transformed ones)
    for (const submittedAnswer of submittedAnswers) {
      // Find the corresponding problem from original problems
      const problem = problems.find((p) => p.id === submittedAnswer.problemId);

      if (!problem) {
        throw new AppException('Submission has invalid problemId')
      }
      problems.splice(problems.indexOf(problem), 1);
      const correctAnswerFields = problem.answer.fields;
      totalFields += correctAnswerFields.length;
      submittedProblemsLength++;
      for (const submittedField of submittedAnswer.fields) {
        const correctField = correctAnswerFields.find((f) => f.index === submittedField.index);

        if (correctField) {

          if (this.compareAnswers(correctField.value, submittedField.value)) {
            totalCorrectFields++;
          }
        }
      }
    }

    if (submittedProblemsLength > problems.length) {
      for(const element of problems) {
        totalFields += element.answer.fields.length;
      }
    }

    return totalFields > 0 ? (totalCorrectFields / totalFields) * 100 : 0;
  }

}
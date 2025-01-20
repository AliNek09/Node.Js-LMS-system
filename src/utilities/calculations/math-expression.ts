import { Problem } from "../../entities/problem.entity";
import { AppException } from '../exceptions/exception';

export class MathExpression
{
  static normalizeValue(value: any): string
  {
    return String(value)
      .trim()
      .toLowerCase()
      .replace(/\s+/g, '') // Remove all whitespace
      .replace(/[^\w+\-*/()=]/g, ''); // Keep only alphanumeric and basic math symbols
  }

  static isMathematicalExpression(value: string): boolean
  {
    return /[-+*/()=a-z0-9]/.test(value);
  }

  static compareMathExpressions(expr1: string, expr2: string): boolean
  {
    // Basic algebraic normalization
    const normalize = (expr: string): string => {
      return expr
        .replace(/\s+/g, '')
        .replace(/([a-z])\+/g, '$1+') // Standardize variable placement
        .replace(/\+([a-z])/g, '+$1')
        .split('+')
        .sort()
        .join('+');
    };

    return normalize(expr1) === normalize(expr2);
  }

  static compareAnswers(correctValue: any, submittedValue: any): boolean
  {
    // Handle null or undefined values
    if (correctValue == null || submittedValue == null) {
      return false;
    }
    const normalizedCorrect = this.normalizeValue(correctValue);
    const normalizedSubmitted = this.normalizeValue(submittedValue);

    // Special case for mathematical expressions
    if (this.isMathematicalExpression(normalizedCorrect)) {
      return this.compareMathExpressions(normalizedCorrect, normalizedSubmitted);
    }

    // Direct comparison for everything else
    return normalizedCorrect === normalizedSubmitted;
  }

  static calculateScore(submittedAnswers: any[], problems: Problem[]): number {
    let totalCorrectFields = 0;
    let totalFields = 0;

    // Process each submitted answer against the original problems (not transformed ones)
    for (const submittedAnswer of submittedAnswers) {
      // Find the corresponding problem from original problems
      const problem = problems.find((p) => p.id === submittedAnswer.problemId);

      if (!problem) {
        throw new AppException('Submission has invalid problemId')
      }

      const correctAnswerFields = problem.answer.fields;

      for (const submittedField of submittedAnswer.fields) {
        const correctField = correctAnswerFields.find((f) => f.index === submittedField.index);

        if (correctField) {
          totalFields++;
          if (this.compareAnswers(correctField.value, submittedField.value)) {
            totalCorrectFields++;
          }
        }
      }
    }

    return totalFields > 0 ? (totalCorrectFields / totalFields) * 100 : 0;
  }

}
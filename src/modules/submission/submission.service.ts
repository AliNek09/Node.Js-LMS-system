import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Submission } from "../../entities/submission.entity";
import { Assignment } from "../../entities/assignment.entity";
import { Student } from "../../entities/student.entity";
import { Problem } from "../../entities/problem.entity";
import { CreateSubmissionDto } from "./dto/create-submission.dto";
import { UpdateSubmissionDto } from "./dto/update-submission.dto";
import { RepositoryUtils } from "../../utilities/repository-utils/findOrFail";
import { MathExpression } from "../../utilities/calculations/math-expression";
import { GetOneStudentSubmissions } from './dto/get-one-student-submissions.dto';
import { GetSubmissionsForOneAssignment } from './dto/get-submissions-for-one-assignment.dto';

@Injectable()
export class SubmissionService
{
  constructor(
    @InjectRepository(Submission)
    private submissionRepository: Repository<Submission>,

    @InjectRepository(Assignment)
    private assignmentRepository: Repository<Assignment>,

    @InjectRepository(Student)
    private studentRepository: Repository<Student>,

    @InjectRepository(Problem)
    private problemRepository: Repository<Problem>
  ) {}

  async create(createDto: CreateSubmissionDto): Promise<Partial<Submission>> {
    const { answer: submittedAnswers, assignmentId, studentsId } = createDto;

    const assignment = await RepositoryUtils.findOrFail(
      this.assignmentRepository,
      assignmentId,
      'Assignment is not found',
      ['problems']
    );

     await RepositoryUtils.findOrFail(
      this.studentRepository,
      studentsId,
      'Student is not found',
    );

    // Get the original problems with correct answers
    const problems = assignment.problems;

    // Use MathExpression to calculate the score
    const score = MathExpression.calculateScore(submittedAnswers, problems)

    // Create submission with transformed problems for response
    const submission = this.submissionRepository.create({
      answer: submittedAnswers,
      score: Math.round(score),
      assignmentId,
      studentsId,
    });

    const savedSubmission = await this.submissionRepository.save(submission);

    return {
      id: savedSubmission.id,
      score: savedSubmission.score,
      assignmentId: savedSubmission.assignmentId,
      studentsId: savedSubmission.studentsId,
    };

  }

  async update(id: number, updateDto: UpdateSubmissionDto): Promise<Partial<Submission>>
  {
    const { answer: updatedAnswers, assignmentId, studentsId } = updateDto

    const submission = await RepositoryUtils.findOrFail(
      this.submissionRepository,
      id,
      'Submission is not found',
      ['assignment', 'assignment.problems']
    );

    await RepositoryUtils.findOrFail(
      this.assignmentRepository,
      assignmentId,
      'Assignment is not found',
      ['problems']
    );

    await RepositoryUtils.findOrFail(
      this.studentRepository,
      studentsId,
      'Student is not found',
    );

    const problems = submission.assignment.problems;

    // Use MathExpression to calculate the score
    const score = MathExpression.calculateScore(updatedAnswers, problems)

    submission.answer = updatedAnswers;
    submission.score = Math.round(score);

    await this.submissionRepository.save(submission);

    return {
      id: submission.id,
      score: submission.score,
      assignmentId: submission.assignment.id,
      studentsId: submission.studentsId,
    }
  }

  async getOneStudentSubmissions(studentId: number)
  {
    const students = await RepositoryUtils.findOrFail(
      this.studentRepository,
      studentId,
      'Student is not found'
    );

    const submissions = await this.submissionRepository.find({
      where: {studentsId: students.id},
      select: ['id', 'score', 'assignmentId', 'date'],
    });

    return new GetOneStudentSubmissions(students.id, submissions);
  }

  async getSubmissionsForOneAssignment(assignmentId: number)
  {
    const assignments = await RepositoryUtils.findOrFail(
      this.assignmentRepository,
      assignmentId,
      'Assignment is not found'
    );

    const submissions = await this.submissionRepository.find({
      where: {assignmentId: assignments.id},
      select: ['id', 'score', 'studentsId', 'date'],
    });

    return new GetSubmissionsForOneAssignment(assignments.id, submissions);
  }

}
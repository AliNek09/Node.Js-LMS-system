import { Submission } from '../../../entities/submission.entity';

export class GetOneStudentSubmissions {
  studentId: number;
  submissions: { id: number, score: number, assignmentId: number, date: Date } [];

  constructor(studentId: number, submissions: Submission[]) {
    this.studentId = studentId;
    this.submissions = submissions
      .map(({ id, score, assignmentId, date }) => ({
        id, score, assignmentId, date,
      }))
      .sort((a, b) => a.id - b.id);
  }
}
import { Submission } from '../../../entities/submission.entity';

export class GetSubmissionsForOneAssignment {
  assignmentId: number;
  submissions: { id: number, score: number, studentsId: number, date: Date } [];

  constructor(assignmentId: number, submissions: Submission[]) {
    this.assignmentId = assignmentId;
    this.submissions = submissions
      .map(({ id, score, studentsId, date }) => ({
        id, score, studentsId, date,
      }))
      .sort((a, b) => a.id - b.id);
  }
}
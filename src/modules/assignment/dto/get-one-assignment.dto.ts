import { Assignment } from "../../../entities/assignment.entity";

export class GetOneAssignmentDto
{

  id: number;
  description: string;
  deadline: Date;
  classId: number;
  topicId: number;
  problemIds: number[]; // Only problem IDs, no full problem objects

  constructor(assignment: Assignment)
  {
    this.id = assignment.id;
    this.description = assignment.description;
    this.deadline = assignment.deadline;
    this.classId = assignment.classId;
    this.topicId = assignment.topicId;
    this.problemIds = assignment.problems
      .map((problem) => problem.id) // Extract problem IDs
      .sort((a, b) => a - b); // Sort in ascending order
  }
}

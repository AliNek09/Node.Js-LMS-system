export interface GetClassPerformance
{

  classDetails: {
    id: number;
    name: string;
    scheduleDays: string;
    lesson_start: Date;
    lesson_finish: Date;
  };
  assignments: {
    assignmentId: number;
    deadline: string; // ISO string format with time
  }[];
  students: {
    studentId: number;
    studentName: string;
    performances: {
      assignmentId: number;
      score: number;
    }[];
  }[];

}
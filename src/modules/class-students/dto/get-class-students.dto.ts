import { Student } from "../../../entities/student.entity";

export class GetClassStudentsDto
{
  classId: number;
  students: { id: number; first_name: string, last_name: string} [];

  constructor(classId: number, students: Student[])
  {
    this.classId = classId;
    this.students = students
      .map(({ id, first_name, last_name}) => ({
        id,
        first_name,
        last_name
      }))
      .sort((a, b) => a.id - b.id);
  }
}
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Class } from "../../entities/class.entity";
import { GetClassPerformance } from "./dto/get-class-performance";
import { AppException } from "../../utilities/exceptions/exception";

@Injectable()
export class PerformanceService
{
  constructor(
    @InjectRepository(Class)
    private readonly classRepository: Repository<Class>
  ) {}

  /**
   * Retrieves performance data for a specific class, including:
   * - Class details
   * - Assignments (with deadlines and topic numbers)
   * - Students and their submission scores per assignment
   *
   * This uses a single query with LEFT JOINs to fetch all related data.
   * If the class is not found, it throws an AppException.
   * If no assignments exist, it returns the class details with empty arrays.
   */

  async getClassPerformance(classId: number): Promise<GetClassPerformance>
  {
    // Fetch class details with related data using LEFT JOINs
    const result = await this.classRepository
      .createQueryBuilder('classes')
      .leftJoinAndSelect('classes.assignments', 'assignments') // Get assignments for the class
      .leftJoinAndSelect('assignments.submissions', 'submissions')  // Get submissions for each assignment
      .leftJoinAndSelect('submissions.students', 'students') // Get student details for each submission
      .where('classes.id = :classId', { classId })
      .getOne();

    if(!result) {
      throw new AppException('Class is not found', 404)
    }

    // Common class details builder
    const classDetails = {
      id: result.id,
      name: result.name,
      scheduleDays: result.schedule_days,
      lesson_start: result.lesson_start,
      lesson_finish: result.lesson_finish
    };

    // Return response with empty assignments and students if none exist
    if(!result.assignments || result.assignments.length === 0) {
      return {
        classDetails,
        assignments: [],
        students: []
      }
    }

    // Map assignments into the desired structure
    const assignments = result.assignments.map(assignment => ({
      assignmentId: assignment.id,
      deadline: assignment.deadline.toISOString(), // ISO format with full timestamp
    }));

    // Build a map for students and group their performances (submissions) by student
    const studentMap: Record<number, { studentId: number; studentName: string; performances: { assignmentId: number; score: number }[] }> = {};

    // Loop through each assignment and its submissions
    result.assignments.forEach(assignment => {
      assignment.submissions.forEach(submission => {
        const student = submission.students;

        // If the student hasn't been added to the map, add them.
        if(!studentMap[student.id]){
          studentMap[student.id] = {
            studentId: student.id,
            studentName: `${student.first_name} ${student.last_name}`,
            performances: [],
          }
        }

        // Add the assignment performance (score) for this student.
        studentMap[student.id].performances.push({
          assignmentId: assignment.id,
          score: submission.score
        });
      });
    });

    // Ensure every student has all assignments listed in their performances
    Object.values(studentMap).forEach(student => {
      result.assignments.forEach(assignment => {
        const hasAssignment = student.performances.some(
          performance => performance.assignmentId === assignment.id,
        );

        if (!hasAssignment) {
          student.performances.push({
            assignmentId: assignment.id,
            score: 0, // Default score for missing submissions
          });
        }
      });

      // Sort performances by assignmentId for better readability
      student.performances.sort((a, b) => a.assignmentId - b.assignmentId);
    });

    // Return the structured response as defined in our DTO
    return {
      classDetails,
      assignments,
      students: Object.values(studentMap)
    }

  }
}
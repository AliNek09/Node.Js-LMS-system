import { Controller, Get, Param, Post } from '@nestjs/common';
import { ClassStudentsService } from "./class-students.service";
import { GetClassStudentsDto } from "./dto/get-class-students.dto";

@Controller('class-students')
export class ClassStudentsController {
  constructor(private readonly classStudentsService: ClassStudentsService) {
  }

  @Get(':classId/students')
  async getStudentsInClass(@Param('classId') classId: number): Promise<GetClassStudentsDto> {
    return await this.classStudentsService.getStudents(classId);
  }

  @Post(':classId/add-student/:studentId')
  async addStudentToClass(
    @Param('classId') classId: number,
    @Param('studentId') studentId: number
  ): Promise<ShortResponse> {
    return await this.classStudentsService.addStudent(studentId, classId);
  }

  @Post(':classId/remove-student/:studentId')
  async removeStudentFromClass(
    @Param('classId') classId: number,
    @Param('studentId') studentId: number
  ): Promise<ShortResponse> {
    return await this.classStudentsService.removeStudent(studentId, classId);
  }
}

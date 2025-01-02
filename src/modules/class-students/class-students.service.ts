import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { RepositoryUtils } from "../../utilities/repository-utils/findOrFail";
import { Student } from "../../entities/student.entity";
import { Class } from "../../entities/class.entity";
import { GetClassStudentsDto } from "./dto/get-class-students.dto";
import { AppException } from "../../utilities/exceptions/exception";

@Injectable()
export class ClassStudentsService
{
  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
    @InjectRepository(Class)
    private readonly classRepository: Repository<Class>

  ) {}

  async getStudents(classId: number): Promise<GetClassStudentsDto>
  {
    const classes = await RepositoryUtils.findOrFail(
      this.classRepository,
      classId,
      'Class is not found'
    );

    const students = await this.studentRepository.find({
      where: { classId: classes.id},
      select: ['id', 'first_name', 'last_name'],
    });

    return new GetClassStudentsDto(classes.id, students)

  }

  async addStudent(studentId: number, classId: number): Promise<ShortResponse>
  {
    const classes = await RepositoryUtils.findOrFail(
      this.classRepository,
      classId,
      'Class is not found'
    );

    const student = await RepositoryUtils.findOrFail(
      this.studentRepository,
      studentId,
      'Student is not found'
    );

    if (student.classId  && student.classId !== classes.id) {
      throw new AppException(`Student is already assigned to another class (Class ID: ${student.classId}).`,
        400
      );
    }

    student.class = classes;
    await this.studentRepository.save(student);

    return {
      status: 'success',
      message: `Student ${student.first_name && student.last_name} is added to class`,
    };
  }

  async removeStudent(studentId: number, classId: number): Promise<ShortResponse>
  {
    const classes = await RepositoryUtils.findOrFail(
      this.classRepository,
      classId,
      'Class is not found'
    );

    const student = await RepositoryUtils.findOrFail(
      this.studentRepository,
      studentId,
      'Student is not found'
    );

    if(!student.classId) {
      throw new AppException('Student does not belong to any class.',
        400
      );
    }

    student.classId = null;
    await this.studentRepository.save(student);

    return {
      status: 'success',
      message: `Student ${student.first_name && student.last_name} is removed from class`,
    };

  }
}
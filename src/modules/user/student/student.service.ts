import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from '../../../entities/student.entity';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

@Injectable()
export class StudentService
{
  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
  ) {}

  async getOne(id: number): Promise<Student>
  {
    const student = await this.studentRepository.findOne({
      where: { id },
      select: [ 'id', 'username', 'first_name', 'last_name', 'remember_token' ]
    });

    if(!student) {
      throw new NotFoundException('Student does not exist');
    }

    return student;

  }

  async create(createStudent: CreateStudentDto):Promise<Student>
  {
    const student = this.studentRepository.create(createStudent);
    return this.studentRepository.save(student);
  }

  async update(id: number, updateStudent: UpdateStudentDto): Promise<Student>
  {
    const student = await this.studentRepository.findOne({where: {id}});

    if(!student) {
      throw new NotFoundException('Student does not exist');
    }

    Object.assign(student, updateStudent);

    return await this.studentRepository.save(student);
  }

  async delete(id: number): Promise<void>
  {
    const student = await this.studentRepository.findOne({where: {id}});

    if(!student) {
      throw new NotFoundException('Student does not exist');
    }

    await this.studentRepository.delete(student);
  }
}

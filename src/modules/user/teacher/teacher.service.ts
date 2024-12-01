import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { Teacher } from '../../../entities/teacher.entity';
import { Repository } from 'typeorm';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';

@Injectable()
export class TeacherService {
  constructor(
    @InjectRepository(Teacher)
    private teacherRepository: Repository<Teacher>,
  ) {
  }

  async getOne(id: number): Promise<Teacher> {

    const teacher = await this.teacherRepository.findOne({
      where: { id },
      select: [ 'id', 'username', 'first_name', 'last_name', 'remember_token' ]
    });

    if(!teacher) {
      throw new NotFoundException('Teacher does not exist');
    }

    return teacher;

  }

  async create(createTeacher: CreateTeacherDto): Promise<Teacher> {
    const teacher = this.teacherRepository.create(createTeacher);
    return this.teacherRepository.save(teacher);
  }

  async update(id: number, updateTeacher: UpdateTeacherDto): Promise<Teacher> {
    const teacher = await this.teacherRepository.findOne({ where: { id } });

    if(!teacher) {
      throw new NotFoundException('Teacher does not exist');
    }

    Object.assign(teacher, updateTeacher);

    return await this.teacherRepository.save(teacher);
  }

  async delete(id: number): Promise<void> {
    const teacher = await this.teacherRepository.findOne({ where: { id } });

    if(!teacher) {
      throw new NotFoundException('Teacher does not exist');
    }

    await this.teacherRepository.delete(id);
  }
}

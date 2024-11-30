import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Class } from '../../entities/class.entity';
import { Teacher } from '../../entities/teacher.entity';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';

@Injectable()
export class ClassService {
  constructor(
    @InjectRepository(Class)
    private readonly ClassRepository: Repository<Class>,
    @InjectRepository(Teacher)
    private readonly TeacherRepository: Repository<Teacher>,
  ) {
  }

  async getOne(id: number): Promise<Class> {
    const class_variable = await this.ClassRepository.findOne({
      where: { id },
      // select:['id', 'name', 'schedule_days', 'room', 'lesson_start', 'lesson_finish', 'teacherId'],
    });

    if (!class_variable) {
      throw new NotFoundException('Class does not exist');
    }

    return class_variable;
  }

  async create(createClassDto: CreateClassDto): Promise<Class> {
    const teacher = await this.TeacherRepository.findOne({ where: { id: createClassDto.teacherId } });
    if (!teacher) {
      throw new NotFoundException('Teacher does not exist');
    }
    const class_variable = this.ClassRepository.create(createClassDto);
    class_variable.teacherId = createClassDto.teacherId;
    return this.ClassRepository.save(class_variable);
  }

  async update(id: number, updateClassDto: UpdateClassDto): Promise<Class> {
    const teacher = await this.TeacherRepository.findOne({ where: { id: updateClassDto.teacherId } });
    if (!teacher) {
      throw new NotFoundException('Teacher does not exist');
    }

    const class_variable = await this.ClassRepository.findOne({
      where: { id },
      // select: ['id', 'name', 'schedule_days', 'room', 'lesson_start', 'lesson_finish'],
      // relations: ['teacher'],
    });

    if (!class_variable) {
      throw new NotFoundException('Class does not exist');
    }
    Object.assign(class_variable, updateClassDto);

    return await this.ClassRepository.save(class_variable);
  }

  async delete(id: number): Promise<void> {
    const class_variable = await this.ClassRepository.findOne({
      where: { id },
      // select: ['id', 'name', 'schedule_days', 'room', 'lesson_start', 'lesson_finish'],
    });
    if (!class_variable) {
      throw new NotFoundException('Class does not exist');
    }
    await this.ClassRepository.delete(class_variable);
  }
}
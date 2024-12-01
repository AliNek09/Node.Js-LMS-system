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

  async getOne(id: number): Promise<Class>
  {

    const classes = await this.ClassRepository.findOne({ where: { id }});

    if (!classes) {
      throw new NotFoundException('Class does not exist');
    }

    return classes;
  }

  async create(createDto: CreateClassDto): Promise<Class>
  {

    const teacher = await this.TeacherRepository.findOne({ where: { id: createDto.teacherId } });

    if (!teacher) {
      throw new NotFoundException('Teacher does not exist');
    }

    const classes = this.ClassRepository.create(createDto);
    classes.teacherId = createDto.teacherId;

    return this.ClassRepository.save(classes);

  }

  async update(id: number, updateDto: UpdateClassDto): Promise<Class>
  {

    const classes = await this.ClassRepository.findOne({ where: { id }});
    if (!classes) {
      throw new NotFoundException('Class does not exist');
    }

    if(updateDto.teacherId) {
      const teacher = await this.TeacherRepository.findOne({ where: { id: updateDto.teacherId } });

      if (!teacher) {
        throw new NotFoundException('Teacher does not exist');
      }
      classes.teacherId = updateDto.teacherId;

    }

    Object.assign(classes, updateDto);

    return await this.ClassRepository.save(classes);
  }

  async delete(id: number): Promise<void>
  {

    const classes = await this.ClassRepository.findOne({where: { id }});

    if (!classes) {
      throw new NotFoundException('Class does not exist');
    }

    await this.ClassRepository.delete(id);
  }
}
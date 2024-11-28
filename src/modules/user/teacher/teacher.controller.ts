import { Body, Controller, Get, HttpCode, Param, Post } from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { Teacher } from '../../../entities/teacher.entity';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';

@Controller('teachers')
export class TeacherController {
  constructor(private readonly teacherService: TeacherService) {
  }

  @Get('getOne/:id')
  @HttpCode(200)
  async getOne(@Param('id') id: number): Promise<Teacher> {
    return await this.teacherService.getOne(id);
  }

  @Post('create')
  @HttpCode(201)
  async create(@Body() createTeacher: CreateTeacherDto): Promise<Teacher>
  {
    return await this.teacherService.create(createTeacher);
  }

  @Post('update/:id')
  @HttpCode(202)
  async update(
    @Param('id') id: number,
    @Body() updateTeacher: UpdateTeacherDto,
  ): Promise<Teacher>
  {
    return await this.teacherService.update(id, updateTeacher);
  }

  @Post('delete/:id')
  @HttpCode(202)
  async delete(
    @Param('id') id: number,
  ): Promise<void>
  {
    return await this.teacherService.delete(id);
  }
}

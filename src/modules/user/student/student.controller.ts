import { Body, Controller, Get, HttpCode, Param, Post } from '@nestjs/common';
import { StudentService } from './student.service';
import { Student } from '../../../entities/student.entity';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

@Controller('students')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Get('getOne/:id')
  @HttpCode(200)
  async getOne(@Param('id') id: number): Promise<Student> {
    return await this.studentService.getOne(id);
  }

  @Post('create')
  @HttpCode(201)
  async create(@Body() createStudent: CreateStudentDto): Promise<Student>
  {
    return await this.studentService.create(createStudent);
  }

  @Post('update/:id')
  @HttpCode(202)
  async update(
    @Param('id') id: number,
    @Body() updateStudent: UpdateStudentDto,
  ): Promise<Student>
  {
    return await this.studentService.update(id, updateStudent);
  }

  @Post('delete/:id')
  @HttpCode(202)
  async delete(
    @Param('id') id: number,
  ): Promise<void>
  {
    return await this.studentService.delete(id);
  }
}
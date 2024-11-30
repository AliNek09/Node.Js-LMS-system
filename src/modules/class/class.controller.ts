import { Body, Controller, Get, HttpCode, Param, Post } from '@nestjs/common';
import { ClassService } from './class.service';
import { Class } from '../../entities/class.entity';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';

@Controller('classes')
export class ClassesController {
  constructor(private readonly classService: ClassService) {
  }

  @Get('getOne/:id')
  async getOne(@Param('id') id: number): Promise<Class> {
    return this.classService.getOne(id);
  }

  @Post('create')
  @HttpCode(201)
  async create(@Body() createClass: CreateClassDto): Promise<Class> {
    return this.classService.create(createClass);
  }

  @Post('update/:id')
  @HttpCode(202)
  async update(@Param('id') id: number, @Body() updateClass: UpdateClassDto): Promise<Class> {
    return this.classService.update(id, updateClass);
  }

  @Post('delete/:id')
  @HttpCode(202)
  async delete(@Param('id') id: number): Promise<void> {
    await this.classService.delete(id);
  }
}
import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from '../../../entities/student.entity';
import { DatabaseModule } from "../../../database/database.module";


@Module({
  imports: [
    DatabaseModule,
    TypeOrmModule.forFeature([Student])
  ],
  controllers: [StudentController],
  providers: [StudentService],
})
export class StudentModule {}
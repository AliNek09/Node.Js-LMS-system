import { Module } from '@nestjs/common';
import { TeacherController } from './teacher.controller';
import { TeacherService } from './teacher.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Teacher } from '../../../entities/teacher.entity';
import { DatabaseModule } from "../../../database/database.module";

@Module({
  imports: [
    DatabaseModule,
    TypeOrmModule.forFeature([Teacher])
  ],
  controllers: [TeacherController],
  providers: [TeacherService],
})
export class TeacherModule {}
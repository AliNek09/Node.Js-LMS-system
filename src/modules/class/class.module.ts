import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Class } from '../../entities/class.entity';
import { Teacher } from '../../entities/teacher.entity';
import { ClassesController } from './class.controller';
import { ClassService } from './class.service';

@Module({
  imports: [
    DatabaseModule,
    TypeOrmModule.forFeature([
      Class,
      Teacher
    ]),
  ],
  controllers: [ClassesController],
  providers: [ClassService],
})
export class ClassModule {
}
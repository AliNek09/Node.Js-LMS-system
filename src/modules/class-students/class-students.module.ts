import { Module } from "@nestjs/common";
import { Class } from "../../entities/class.entity";
import { Student } from "../../entities/student.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DatabaseModule } from "../../database/database.module";
import { ClassStudentsController } from "./class-students.controller";
import { ClassStudentsService } from "./class-students.service";

@Module({
  imports: [
    DatabaseModule,
    TypeOrmModule.forFeature([
      Class,
      Student
    ])
  ],
  controllers: [ClassStudentsController],
  providers: [ClassStudentsService]


})

export class ClassStudentsModule {}
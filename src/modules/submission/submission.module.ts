import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DatabaseModule } from "../../database/database.module";
import { Assignment } from "../../entities/assignment.entity";
import { Student } from "../../entities/student.entity";
import { Problem } from "../../entities/problem.entity";
import { Submission } from "../../entities/submission.entity";
import { SubmissionService } from "./submission.service";
import { SubmissionController } from "./submission.controller";


@Module({
  imports: [
    DatabaseModule,
    TypeOrmModule.forFeature([
      Submission,
      Assignment,
      Student,
      Problem,
    ])
  ],
  controllers: [SubmissionController],
  providers: [SubmissionService]

})

export class SubmissionModule {}
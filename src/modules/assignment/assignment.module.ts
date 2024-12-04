import { Module } from "@nestjs/common";
import { AssignmentService} from "./assignment.service";
import { AssignmentController } from "./assignment.controller";
import { Assignment } from "../../entities/assignment.entity";
import { Class } from "../../entities/class.entity";
import { Topic } from "../../entities/topic.entity";
import { Problem } from "../../entities/problem.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DatabaseModule } from "../../database/database.module";

@Module({
  imports: [
    DatabaseModule,
    TypeOrmModule.forFeature([
      Assignment,
      Class,
      Topic,
      Problem
    ])
  ],
  controllers: [AssignmentController],
  providers: [AssignmentService]

})

export class AssignmentModule {}


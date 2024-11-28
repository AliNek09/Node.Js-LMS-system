import { Module } from "@nestjs/common";
import { ProblemController } from "./problem.controller";
import { ProblemService } from "./problem.service";
import { Problem} from "../../entities/problem.entity";
import { Topic } from "../../entities/topic.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DatabaseModule } from "../../database/database.module";


@Module({
  imports: [
    DatabaseModule,
    TypeOrmModule.forFeature([Problem, Topic])
  ],
  controllers: [ProblemController],
  providers: [ProblemService]
})

export class ProblemModule {}
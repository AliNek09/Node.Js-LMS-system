import { Module } from "@nestjs/common";
import { TopicController } from "./topic.controller";
import { TopicService } from "./topic.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Topic } from "../../entities/topic.entity";
import { Problem } from "../../entities/problem.entity";
import { DatabaseModule } from "../../database/database.module";

@Module({
  imports: [
    DatabaseModule,
    TypeOrmModule.forFeature([Topic, Problem]) // Here, use ENTITY, which will be used.
  ],
  controllers: [TopicController],
  providers: [TopicService]
})

export class TopicModule {}
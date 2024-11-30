import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from '@nestjs/config';
import { Topic } from "../entities/topic.entity";
import { Problem } from "../entities/problem.entity";
import { Student } from "../entities/student.entity";
import { Teacher } from "../entities/teacher.entity";
import * as process from "process";
import { Class } from '../entities/class.entity';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}), //loads environment variables
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'default',
      port: parseInt(process.env.DB_PORT, 10) || 5432,
      username: process.env.DB_USERNAME || 'default',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'default',
      entities: [Topic, Problem, Student, Teacher, Class], // WRITE HERE EVERY ENTITY, EVERRRYYY!!!!!!
      synchronize: true,
    }),
  ],
})
export class DatabaseModule {}

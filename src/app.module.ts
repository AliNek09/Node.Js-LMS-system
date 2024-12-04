import { Module } from '@nestjs/common';
import { TopicModule } from "./modules/topic/topic.module";
import { ProblemModule } from "./modules/problem/problem.module";
import { TeacherModule } from "./modules/user/teacher/teacher.module";
import { StudentModule } from "./modules/user/student/student.module";
import { ClassModule } from './modules/class/class.module';
import { AssignmentModule } from "./modules/assignment/assignment.module";


@Module({
  imports: [
    TopicModule,
    ProblemModule,
    TeacherModule,
    StudentModule,
    ClassModule,
    AssignmentModule
  ],
  // controllers: [AppController],
  // providers: [AppService],
})
export class AppModule {}

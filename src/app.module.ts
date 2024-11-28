import { Module } from '@nestjs/common';
import { TopicModule } from "./modules/topic/topic.module";
import { ProblemModule } from "./modules/problem/problem.module";
import { TeacherModule } from "./modules/user/teacher/teacher.module";
import { StudentModule } from "./modules/user/student/student.module";


@Module({
  imports: [
    TopicModule,
    ProblemModule,
    TeacherModule,
    StudentModule,
  ],
  // controllers: [AppController],
  // providers: [AppService],
})
export class AppModule {}

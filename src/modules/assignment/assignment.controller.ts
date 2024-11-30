import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Topic } from "../../entities/topic.entity";
import { Problem } from "../../entities/problem.entity";

@Entity('assignments')
export class Assignment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column('text')
  description: string;

  @Column('datetime')
  deadline: Date;

  // @ManyToOne(() => Class, (classEntity) => classEntity.assignments, { nullable: false })
  // @JoinColumn({ name: 'class_id' })
  // class: Class;
  //
  // @ManyToOne(() => Topic, (topic) => topic.assignments, { nullable: false })
  // @JoinColumn({ name: 'topic_id' })
  // topic: Topic;
  //
  // @ManyToOne(() => Problem, (problem) => problem.assignments, { nullable: false })
  // @JoinColumn({ name: 'problem_id' })
  // problem: Problem;
}

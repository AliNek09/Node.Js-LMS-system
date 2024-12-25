import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  RelationId,
  ManyToMany,
  JoinTable,
  JoinColumn
} from "typeorm";
import { Class } from './class.entity';  // Make sure to import the Class entity
import { Topic } from './topic.entity';  // Make sure to import the Topic entity
import { Problem } from './problem.entity';  // Make sure to import the Problem entity

@Entity('assignments')
export class Assignment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  description: string;

  @Column('timestamp')
  deadline: Date;

  @ManyToOne(() => Class, (classes) => classes.assignments)
  @JoinColumn({name: 'classId'})
  classes: Class;

  @RelationId((assignment: Assignment) => assignment.classes)
  @Column()
  classId: number;

  @ManyToOne(() => Topic, (topic) => topic.assignments)
  @JoinColumn({ name: 'topicId' }) // Explicitly map topicId to the database column
  topic: Topic;

  @RelationId((assignment: Assignment) => assignment.topic)
  @Column({ nullable: false }) // Ensure this column is not nullable
  topicId: number;

  @ManyToMany(() => Problem, (problem) => problem.assignments)
  @JoinTable({name: 'assignments_problems'}) // Creates a join table for many-to-many relationship
  problems: Problem[];


}

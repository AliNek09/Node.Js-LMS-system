import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, RelationId, ManyToMany } from "typeorm";
import { Topic } from "./topic.entity";
import { Assignment } from "./assignment.entity";

@Entity('problems')
export class Problem
{
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int')
  order: number;

  @Column('jsonb') // Refactored to jsonb type
  answer: any;

  // Problem belongs to one Topic
  @ManyToOne(() => Topic, (topic) => topic.problems)
  topic: Topic;

  @RelationId((problem: Problem) => problem.topic)
  @Column()
  topicId: number;   // This stores the topic ID for the problem

  @ManyToMany(() => Assignment, (assignment) => assignment.problems)
  assignments: Assignment[]

}
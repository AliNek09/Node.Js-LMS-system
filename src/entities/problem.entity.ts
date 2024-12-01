import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, RelationId } from "typeorm";
import { Topic } from "./topic.entity";

@Entity('problems')
export class Problem
{
  @PrimaryGeneratedColumn()
  id: number;

  @Column('decimal')
  order: number;

  @Column()
  answer: string;


  @ManyToOne(() => Topic, (topic) => topic.problems)
  topic: Topic;

  @RelationId((problem: Problem) => problem.topic)
  @Column()
  topicId: number;

}
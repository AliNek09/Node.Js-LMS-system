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
  title: string;


  @Column('text')  // Stores the problem text with placeholders (e.g., 'Solve {1} + {2}')
  text: string[];

  @Column('jsonb')
  placeholder: { index: number, answer: string }[];

  @ManyToOne(() => Topic, (topic) => topic.problems)
  topic: Topic;

  @RelationId((problem: Problem) => problem.topic)
  topicId: number;

}
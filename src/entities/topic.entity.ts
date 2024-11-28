import { Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";
import { Problem } from "./problem.entity";

@Entity('topics')
export class Topic
{
  @PrimaryGeneratedColumn()
  id: number;

  @Column('decimal')
  topic_number: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @OneToMany(() => Problem, (problem) => problem.topic)
  problems: Problem[];

}
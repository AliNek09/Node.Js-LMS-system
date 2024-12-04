import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, RelationId } from "typeorm";
import { Teacher } from './teacher.entity';
import { Assignment } from "./assignment.entity";

@Entity('classes')
export class Class{
  @PrimaryGeneratedColumn()
  id:number;

  @Column({unique:true})
  name:string;

  @Column()
  schedule_days:string;

  @Column()
  lesson_start:Date;

  @Column()
  lesson_finish:Date;

  @Column()
  place:string;

  @ManyToOne(() => Teacher, (teacher) => teacher.classes)
  teacher: Teacher;

  @RelationId((classes: Class) => classes.teacher)
  @Column()
  teacherId: number;

  @OneToMany(() => Assignment, (assignment) => assignment.classes)
  assignments: Assignment[];

}
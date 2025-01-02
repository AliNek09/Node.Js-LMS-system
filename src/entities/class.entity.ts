import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, RelationId } from "typeorm";
import { Teacher } from './teacher.entity';
import { Assignment } from "./assignment.entity";
import { Student } from "./student.entity";

@Entity('classes')
export class Class{
  @PrimaryGeneratedColumn()
  id:number;

  @Column({unique: true})
  name: string;

  @Column()
  schedule_days: string;

  @Column('timestamp')
  lesson_start: Date;

  @Column('timestamp')
  lesson_finish: Date;

  @Column()
  place: string;

  @OneToMany(() => Student, (student) => student.class)
  students: Student[];

  @ManyToOne(() => Teacher, (teacher) => teacher.classes)
  teacher: Teacher;

  @RelationId((classes: Class) => classes.teacher)
  @Column()
  teacherId: number;

  @OneToMany(() => Assignment, (assignment) => assignment.classes)
  assignments: Assignment[];

}
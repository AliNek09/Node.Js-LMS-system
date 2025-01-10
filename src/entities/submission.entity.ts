import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, UpdateDateColumn, RelationId } from "typeorm";
import { Assignment } from "./assignment.entity";
import { Student } from "./student.entity";

@Entity('submissions')
export class Submission
{
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'jsonb', nullable: true})
  answer: Record<string, any>;

  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
  date: Date;

  @Column({ type: 'int', default: 0})
  score: number;

  @ManyToOne(() => Assignment, (assignment) => assignment.submissions, { nullable: false, onDelete: 'CASCADE'})
  assignment: Assignment;

  @RelationId((submissions: Submission) => submissions.assignment)
  @Column({nullable: false})
  assignmentId: number;

  @ManyToOne(() => Student, (student) => student.submission)
  students: Student;

  @RelationId((submission: Submission) => submission.students)
  @Column({ nullable: false})
  studentsId: number;
}
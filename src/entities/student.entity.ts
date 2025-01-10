import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany
} from "typeorm";
import { Class } from "./class.entity";
import { Submission } from "./submission.entity";

@Entity('students')
export class Student {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({unique: true})
  username: string;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column()
  password: string;

  @Column({nullable: true})
  remember_token: string;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  created_at: Date;

  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
  updated_at: Date;

  @ManyToOne(() => Class, (classes) => classes.students, { nullable: true , onDelete: 'CASCADE'})
  class: Class;

  @Column({ nullable: true })
  classId: number;

  @OneToMany(() => Submission, (submission) => submission.students)
  submission: Submission[];
}
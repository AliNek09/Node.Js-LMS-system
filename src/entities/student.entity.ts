import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, RelationId } from "typeorm";
import { Class } from "./class.entity";

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

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;

  @ManyToOne(() => Class, (classes) => classes.students, { nullable: true , onDelete: 'CASCADE'})
  class: Class;

  @Column({ nullable: true })
  classId: number;

}
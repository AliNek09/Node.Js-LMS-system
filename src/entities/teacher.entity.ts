import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Class } from './class.entity';

@Entity('teachers')
export class Teacher
{
  @PrimaryGeneratedColumn()
  id: number;

  @Column({unique:true})
  username: string;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column()
  password: string;

  @Column({nullable: true}) // for dev
  remember_token: string;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;

  @OneToMany(() => Class, (classes) => classes.teacher)
  classes: Class[];

}
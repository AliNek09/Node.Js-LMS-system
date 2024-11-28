import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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

  @Column({default: ""}) // for dev
  remember_token: string;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;
}
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('magazine-users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;
}

import { Subscription } from 'src/subscription/entities/subscription.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity('magazines')
export class Magazine {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 200 })
  name: string;

  @Column('text')
  description: string;

  @CreateDateColumn()
  createDate: Date;

  @Column('decimal', { precision: 10, scale: 2 })
  monthlyPrice: number;

  @OneToMany(() => Subscription, (subscription) => subscription.magazine)
  subscriptions: Subscription[];
}

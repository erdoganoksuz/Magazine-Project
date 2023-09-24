import { Module } from '@nestjs/common';
import { SubscriptionService } from './subscription.service';
import { SubscriptionController } from './subscription.controller';
import { MagazineModule } from 'src/magazine/magazine.module';
import { UserModule } from 'src/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subscription } from './entities/subscription.entity';

@Module({
  controllers: [SubscriptionController],
  providers: [SubscriptionService],
  imports: [
    TypeOrmModule.forFeature([Subscription]),
    MagazineModule,
    UserModule,
  ],
})
export class SubscriptionModule {}

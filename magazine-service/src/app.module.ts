import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from './config/config.module';
import { MagazineModule } from './magazine/magazine.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { SubscriptionModule } from './subscription/subscription.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    ConfigModule,
    MagazineModule,
    UserModule,
    AuthModule,
    SubscriptionModule,
  ],
})
export class AppModule {}

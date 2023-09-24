import { Module } from '@nestjs/common';
import { MagazineService } from './magazine.service';
import { MagazineController } from './magazine.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Magazine } from './entities/magazine.entity';
import { UserModule } from 'src/user/user.module';

@Module({
  controllers: [MagazineController],
  providers: [MagazineService],
  imports: [TypeOrmModule.forFeature([Magazine]), UserModule],
  exports: [MagazineService],
})
export class MagazineModule {}

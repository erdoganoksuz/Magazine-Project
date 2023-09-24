import { DynamicModule, Global, Module } from '@nestjs/common';
import { ConfigService } from './config.service';
import {
  ConfigModuleOptions,
  ConfigModule as NestConfigModule,
} from '@nestjs/config';

@Global()
@Module({
  exports: [ConfigService],
  providers: [ConfigService],
})
export class ConfigModule extends NestConfigModule {
  static forRoot(options?: ConfigModuleOptions): DynamicModule {
    return super.forRoot(
      options ?? {
        envFilePath: ['.env'],
        isGlobal: true,
      },
    );
  }
}

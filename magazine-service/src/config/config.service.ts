import { ConfigService as NestConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { JwtModuleOptions, JwtOptionsFactory } from '@nestjs/jwt';

export class ConfigService
  extends NestConfigService
  implements TypeOrmOptionsFactory, JwtOptionsFactory
{
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      host: this.get<string>('DATABASE_HOST'),
      port: this.get<number>('DATABASE_PORT'),
      username: this.get<string>('DATABASE_USER'),
      password: this.get<string>('DATABASE_PASSWORD'),
      database: this.get<string>('DATABASE_NAME'),
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      logging: this.get<string>('NODE_ENV') === 'development',
      synchronize: true,
    };
  }

  createJwtOptions(): JwtModuleOptions | Promise<JwtModuleOptions> {
    return {
      global: true,
      verifyOptions: {
        algorithms: ['HS256'],
        issuer: this.get<string>('JWT_SECRET'),
      },
    };
  }
}

import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LoginDto {
  @IsString()
  @ApiProperty({
    description: 'Name of the User',
  })
  username: string;

  @IsString()
  @ApiProperty({
    description: 'Password of the User',
  })
  password: string;
}

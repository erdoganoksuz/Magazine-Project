import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateMagazineDto {
  @ApiProperty({
    description: 'Name of the Magazine',
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Description of the Magazine',
  })
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    description: 'Subscription price of the Magazine',
  })
  @IsNotEmpty()
  monthlyPrice: number;
}

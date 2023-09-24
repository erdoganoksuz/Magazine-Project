import {
  Controller,
  Post,
  Body,
  BadRequestException,
  InternalServerErrorException,
  Request,
  Get,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('user')
@ApiTags('User')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * Create User
   */
  @ApiBadRequestResponse({
    description: 'At least one User value is not valid',
    type: BadRequestException,
  })
  @ApiInternalServerErrorResponse({
    description: 'Something went wrong ',
    type: InternalServerErrorException,
  })
  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    await this.userService.createUser(createUserDto);
    return;
  }

  /**
   * Create User
   */
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
    type: UnauthorizedException,
  })
  @ApiInternalServerErrorResponse({
    description: 'Something went wrong ',
    type: InternalServerErrorException,
  })
  @Get()
  @UseGuards(JwtAuthGuard)
  async get(@Request() req: { user: User }): Promise<Partial<User>> {
    return { username: req.user.username, id: req.user.id };
  }
}

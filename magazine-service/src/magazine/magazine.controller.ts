import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ForbiddenException,
  BadRequestException,
  InternalServerErrorException,
  UseGuards,
  UnauthorizedException,
} from '@nestjs/common';
import { MagazineService } from './magazine.service';
import { CreateMagazineDto } from './dto/create-magazine.dto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiNoContentResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UpdateMagazineDto } from './dto/update-magazine.dto';

@Controller('magazine')
@ApiTags('Magazine')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class MagazineController {
  constructor(private readonly magazineService: MagazineService) {}
  /**
   * Creates Magazine
   */
  @ApiNoContentResponse({
    description: 'Magazine have been created successfully.',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
    type: UnauthorizedException,
  })
  @ApiForbiddenResponse({
    description:
      'Caller does not have the right permissions to create Magazine',
    type: ForbiddenException,
  })
  @ApiBadRequestResponse({
    description: 'At least one Magazine value is not valid',
    type: BadRequestException,
  })
  @ApiInternalServerErrorResponse({
    description: 'Something went wrong ',
    type: InternalServerErrorException,
  })
  @Post()
  async create(@Body() createMagazineDto: CreateMagazineDto) {
    await this.magazineService.create(createMagazineDto);
    return;
  }

  /**
   * Gets Magazines with subscriptions
   */
  @ApiForbiddenResponse({
    description: 'Caller does not have the right permissions to get Magazines',
    type: ForbiddenException,
  })
  @ApiInternalServerErrorResponse({
    description: 'Something went wrong ',
    type: InternalServerErrorException,
  })
  @Get()
  findAll() {
    return this.magazineService.findAll();
  }

  /**
   * Get Magazine
   */
  @ApiForbiddenResponse({
    description: 'Caller does not have the right permissions to get Magazine',
    type: ForbiddenException,
  })
  @ApiInternalServerErrorResponse({
    description: 'Something went wrong ',
    type: InternalServerErrorException,
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.magazineService.findOne(+id);
  }

  /**
   * Patch Magazine
   */
  @ApiForbiddenResponse({
    description:
      'Caller does not have the right permissions to update Magazine',
    type: ForbiddenException,
  })
  @ApiBadRequestResponse({
    description: 'At least one Magazine value is not valid',
    type: BadRequestException,
  })
  @ApiInternalServerErrorResponse({
    description: 'Something went wrong ',
    type: InternalServerErrorException,
  })
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateMagazineDto: UpdateMagazineDto,
  ) {
    await this.magazineService.update(+id, updateMagazineDto);
    return;
  }

  /**
   * Delete Magazine
   */
  @ApiForbiddenResponse({
    description:
      'Caller does not have the right permissions to delete Magazine',
    type: ForbiddenException,
  })
  @ApiInternalServerErrorResponse({
    description: 'Something went wrong ',
    type: InternalServerErrorException,
  })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.magazineService.remove(+id);
    return;
  }
}

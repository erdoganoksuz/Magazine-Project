import {
  Controller,
  Post,
  Param,
  Delete,
  ForbiddenException,
  InternalServerErrorException,
  Request,
  Get,
  UseGuards,
} from '@nestjs/common';
import { SubscriptionService } from './subscription.service';
import {
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiNoContentResponse,
  ApiTags,
} from '@nestjs/swagger';
import { User } from 'src/user/entities/user.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('subscription')
@ApiTags('Subscription')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  /**
   * Get All Magazines by user
   */
  @ApiForbiddenResponse({
    description: 'Caller does not have the right permissions get to Magazines',
    type: ForbiddenException,
  })
  @ApiInternalServerErrorResponse({
    description: 'Something went wrong ',
    type: InternalServerErrorException,
  })
  @Get()
  async getAllByUser(@Request() req: { user: User }) {
    return await this.subscriptionService.findAllByUser(req.user);
  }

  /**
   * Subscribe to Magazine
   */
  @ApiNoContentResponse({
    description: 'User subscribed to magazine successfully.',
  })
  @ApiForbiddenResponse({
    description:
      'Caller does not have the right permissions subscribe to Magazine',
    type: ForbiddenException,
  })
  @ApiInternalServerErrorResponse({
    description: 'Something went wrong ',
    type: InternalServerErrorException,
  })
  @Post(':id')
  async subscribe(@Param('id') id: string, @Request() req: { user: User }) {
    await this.subscriptionService.subscribe(req.user.id, +id);
    return;
  }

  /**
   * Cancel Subscription of Magazine
   */
  @ApiNoContentResponse({
    description: 'User canceled subsctiption to magazine successfully.',
  })
  @ApiForbiddenResponse({
    description:
      'Caller does not have the right permissions subscribe to Magazine',
    type: ForbiddenException,
  })
  @ApiInternalServerErrorResponse({
    description: 'Something went wrong ',
    type: InternalServerErrorException,
  })
  @Delete(':id')
  async cancelSubscription(@Param('id') id: string) {
    await this.subscriptionService.cancelSubscription(+id);
    return;
  }
}

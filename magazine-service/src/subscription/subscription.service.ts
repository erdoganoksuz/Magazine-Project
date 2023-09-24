import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Subscription } from './entities/subscription.entity';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/entities/user.entity';
import { MagazineService } from 'src/magazine/magazine.service';

@Injectable()
export class SubscriptionService {
  constructor(
    @Inject(MagazineService)
    private readonly magazineService: MagazineService,
    @InjectRepository(Subscription)
    private readonly subscriptionRepository: Repository<Subscription>,
    @Inject(UserService)
    private userService: UserService,
  ) {}

  async findAllByUser(user: User): Promise<any> {
    return await this.subscriptionRepository.find({
      where: { user },
      relations: { magazine: true },
    });
  }

  async subscribe(userId: number, magazineId: number): Promise<Subscription> {
    const [magazine, user] = await Promise.all([
      this.magazineService.findOne(magazineId),
      this.userService.findUserById(userId),
    ]);

    if (!magazine || !user) {
      throw new NotFoundException('Magazine or user not found');
    }

    const isSubscriptionExist = await this.subscriptionRepository.findOne({
      where: {
        user,
        magazine: { id: magazineId },
        isCancelled: false,
      },
    });

    if (isSubscriptionExist) {
      throw new ConflictException('Magazine is already subscribed by user');
    }

    return this.subscriptionRepository.save({
      user,
      magazine,
      startDate: new Date(),
      endDate: new Date(),
      isCancelled: false,
    });
  }

  async cancelSubscription(subscriptionId: number): Promise<Subscription> {
    const subscription = await this.subscriptionRepository.findOne({
      where: { id: subscriptionId },
    });

    if (!subscription) {
      throw new NotFoundException('Subscription not found');
    }

    if (subscription.isCancelled) {
      throw new BadRequestException('Subscription is already canceled');
    }

    // Update the subscription
    subscription.isCancelled = true;
    subscription.cancellationDate = new Date();

    return await this.subscriptionRepository.save(subscription);
  }
}

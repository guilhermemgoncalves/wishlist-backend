import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { WishlistEntity } from '../domain/entities/wishlist-entity';
import { wishlistSeedData } from './wishlist.seed-data';

@Injectable()
export class WishlistSeeder implements OnApplicationBootstrap {
  logger = new Logger('Seeder');

  constructor(
    @InjectRepository(WishlistEntity)
    private readonly wishlistRepo: MongoRepository<WishlistEntity>,
  ) {}

  async onApplicationBootstrap(): Promise<void> {
    await this.wishlistRepo.clear();

    await this.wishlistRepo.insertMany(wishlistSeedData);
    this.logger.log('Wishlist successfully restarted.');
  }
}

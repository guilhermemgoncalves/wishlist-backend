import { InjectRepository } from '@nestjs/typeorm';
import { WishlistEntity } from '../../domain/entities/wishlist-entity';
import { MongoRepository } from 'typeorm';

export class WishlistMongoRepositoryImpl {
  constructor(
    @InjectRepository(WishlistEntity)
    private readonly repo: MongoRepository<WishlistEntity>,
  ) {}

  async findByUserId(userId: string): Promise<WishlistEntity | null> {
    return this.repo.findOne({ where: { userId } });
  }

  async saveWishlist(wishlist: WishlistEntity): Promise<WishlistEntity> {
    return this.repo.save(wishlist);
  }
}

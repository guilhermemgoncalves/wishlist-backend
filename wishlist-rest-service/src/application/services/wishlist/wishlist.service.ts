import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  WISHLIST_REPOSITORY,
  WishlistRepository,
} from '../../../domain/interfaces/wishlist-repository';
import { WishlistEntity } from '../../../domain/entities/wishlist-entity';
import { WishlistDto } from '../../../presentation/dto/wishlist.dto';

@Injectable()
export class WishlistService {
  constructor(
    @Inject(WISHLIST_REPOSITORY)
    private readonly wishlistRepository: WishlistRepository,
  ) {}

  async getWishlist(userId: string): Promise<WishlistDto | null> {
    const wishList = await this.wishlistRepository.findByUserId(userId);

    if (!wishList) {
      throw new NotFoundException('Wishlist not found for user.');
    }
    const products = wishList.products.map((product) => ({
      id: product.id,
      addAt: product.addAt,
    }));

    return {
      userId,
      products: products,
    };
  }

  async save(wishlist: WishlistDto): Promise<WishlistEntity> {
    const wishlistEntity = await this.wishlistRepository.findByUserId(
      wishlist.userId,
    );

    const products = wishlist.products.map((product) => ({
      id: product.id,
      addAt: product.addAt,
    }));

    if (!wishlistEntity) {
      const newWishlistEntity = new WishlistEntity();
      newWishlistEntity.userId = wishlist.userId;
      newWishlistEntity.products = products;

      return this.wishlistRepository.saveWishlist(newWishlistEntity);
    }

    wishlistEntity.userId = wishlist.userId;
    wishlistEntity.products = products;

    return this.wishlistRepository.saveWishlist(wishlistEntity);
  }
}

import { Inject, Injectable } from '@nestjs/common';
import { WishlistHttpClient } from '../../interfaces/wishlist-http-client';
import { WishlistModel } from '../../models/wishlist-model';

@Injectable()
export class WishlistService {
  constructor(
    @Inject('WishlistHttpClient')
    private readonly wishlistHttpClient: WishlistHttpClient,
  ) {}

  public async update(wishList: WishlistModel) {
    await this.wishlistHttpClient.saveWishlist(wishList);
  }

  public async getWishlistByUserId(userId: string): Promise<WishlistModel> {
    return await this.wishlistHttpClient.getWishlistByUserId(userId);
  }
}

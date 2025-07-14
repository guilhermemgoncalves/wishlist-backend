import { Injectable } from '@nestjs/common';
import { WishlistModel } from '../../domain/models/wishlist-model';
import { WishlistService } from '../../domain/services/wishlist/wishlist.service';

@Injectable()
export class CheckIfProductExistsUseCase {
  constructor(private readonly wishlistService: WishlistService) {}
  public async execute(productId: string, userId: string): Promise<boolean> {
    const wishlist: WishlistModel =
      await this.wishlistService.getWishlistByUserId(userId);
    return wishlist.validateProductExists(productId);
  }
}

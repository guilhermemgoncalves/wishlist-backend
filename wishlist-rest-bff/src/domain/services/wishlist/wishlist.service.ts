import { Inject, Injectable } from '@nestjs/common';
import { WishlistHttpClient } from '../../interfaces/wishlist-http-client';
import { WishlistModel } from '../../models/wishlist-model';
import { WishlistDto } from '../../../infrastructure/dto/wishlist.dto';

@Injectable()
export class WishlistService {
  constructor(
    @Inject('WishlistHttpClient')
    private readonly wishlistHttpClient: WishlistHttpClient,
  ) {}

  public async update(wishList: WishlistModel) {
    const wishListDto: WishlistDto = this.toDto(wishList);
    await this.wishlistHttpClient.saveWishlist(wishListDto);
  }

  public async getWishlistByUserId(userId: string): Promise<WishlistModel> {
    const { userId: userIdFromDto, products } =
      await this.wishlistHttpClient.getWishlistByUserId(userId);

    return Object.assign(new WishlistModel(), {
      userId: userIdFromDto,
      products,
    });
  }

  private toDto(model: WishlistModel): WishlistDto {
    return {
      userId: model.getUserId(),
      products: model.getProducts().map((p) => ({
        id: p.id,
        addAt: p.addAt,
      })),
    };
  }
}

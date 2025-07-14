import { WishlistService } from '../../domain/services/wishlist/wishlist.service';
import { ProductService } from '../../domain/services/product/product.service';
import { RemoveProductResponse } from '../../presentation/rest/dtos/remove-product.response.dto';
import { WishlistModel } from '../../domain/models/wishlist-model';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RemoveProductUseCase {
  constructor(
    private readonly wishlistService: WishlistService,
    private readonly productService: ProductService,
  ) {}

  public async execute(
    productId: string,
    userId: string,
  ): Promise<RemoveProductResponse> {
    const wishList: WishlistModel =
      await this.wishlistService.getWishlistByUserId(userId);

    const productIsInWishlist = wishList.validateProductExists(productId);

    if (!productIsInWishlist) {
      return {
        removed: false,
        message: 'Product not found in wishlist.',
      };
    }

    wishList.removeProduct(productId);

    await this.wishlistService.update(wishList);
    return {
      removed: true,
      message: 'Product removed from wishlist successfully.',
    };
  }
}

import { AddProductRequest } from '../../presentation/dtos/add-product.request.dto';
import { AddProductResponse } from '../../presentation/dtos/add-product-response.dto';
import { WishlistModel } from '../../domain/models/wishlist-model';
import { Injectable, NotFoundException } from '@nestjs/common';
import { WishlistProductModel } from '../../domain/models/wishlist-product.model';
import { WishlistService } from '../../domain/services/wishlist/wishlist.service';
import { ProductService } from '../../domain/services/product/product.service';

@Injectable()
export class AddProductUseCase {
  constructor(
    private readonly wishlistService: WishlistService,
    private readonly productService: ProductService,
  ) {}

  public async execute(
    product: AddProductRequest,
    userId: string,
  ): Promise<AddProductResponse> {
    const wishList: WishlistModel =
      await this.wishlistService.getWishlistByUserId(userId);

    const productExists: boolean = await this.productService.productExists(
      product.id,
    );

    if (!productExists) {
      throw new NotFoundException('Product not found.');
    }

    const productIsInWishlist = wishList.validateProductExists(product.id);

    if (productIsInWishlist) {
      return {
        added: false,
        message: 'Product already exists in wishlist.',
      };
    }

    if (wishList.isFull()) {
      return {
        added: false,
        message: 'Wishlist is full. You can only add up to 20 products.',
      };
    }

    const wishListProduct: WishlistProductModel = {
      id: product.id,
      addAt: new Date(),
    };

    wishList.addProduct(wishListProduct);
    await this.wishlistService.update(wishList);

    return {
      added: true,
      message: 'Product added to wishlist successfully.',
    };
  }
}

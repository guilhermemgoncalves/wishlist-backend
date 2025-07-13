import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductService } from '../../domain/services/product/product.service';
import { WishlistService } from '../../domain/services/wishlist/wishlist.service';
import { WishlistModel } from '../../domain/models/wishlist-model';
import { ProductModel } from '../../domain/models/product-model';
import { WishlistListResponse } from '../../presentation/dtos/wishlist-list-response.dto';
import { WishlistProductModel } from '../../domain/models/wishlist-product.model';

@Injectable()
export class ListProductsUseCase {
  constructor(
    private readonly productService: ProductService,
    private readonly wishListService: WishlistService,
  ) {}

  async execute(userId: string) {
    const wishList: WishlistModel =
      await this.wishListService.getWishlistByUserId(userId);

    if (!wishList) {
      throw new NotFoundException('Wishlist not found.');
    }

    return this.fetchAllProducts(wishList.getProducts());
  }

  private async fetchAllProducts(
    products: WishlistProductModel[],
  ): Promise<WishlistListResponse[]> {
    return await Promise.all(
      products.map(async (product: WishlistProductModel) => {
        const productData: ProductModel = await this.productService.getById(
          product.id,
        );

        return {
          id: productData.id,
          name: productData.name,
          price: productData.price,
          category: productData.category,
          addAt: product.addAt,
        };
      }),
    );
  }
}

import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ProductHttpClient } from '../../interfaces/product-http-client';
import { ProductModel } from '../../models/product-model';
import { WishlistProductModel } from '../../models/wishlist-product.model';
import { AddProductResponse } from '../../../application/dtos/add-product-response.dto';
import { AddProductRequest } from '../../../application/dtos/add-product.request';
import { RemoveProductResponse } from '../../../application/dtos/remove-product.response.dto';
import { WishlistListResponseDto } from '../../../application/dtos/wishlist-list-response.dto';
import { UserModel } from '../../models/user-model';
import { UserService } from '../user/user.service';
import { WishlistHttpClient } from '../../interfaces/wishlist-http-client';
import { WishlistModel } from '../../models/wishlist-model';

@Injectable()
export class WishlistProductService {
  constructor(
    @Inject('ProductHttpClient')
    private readonly productHttpClient: ProductHttpClient,
    private readonly userService: UserService,
    @Inject('WishlistHttpClient')
    private readonly wishlistHttpClient: WishlistHttpClient,
  ) {}

  async addProduct(
    product: AddProductRequest,
    userId: string,
  ): Promise<AddProductResponse> {
    const wishList: WishlistModel =
      await this.wishlistHttpClient.getWishlistByUserId(userId);

    if (!(await this.productHttpClient.checkIfProductExists(product.id))) {
      throw new NotFoundException('Product not found.');
    }

    const productIsInWishlist = this.validateProductExists(
      product.id,
      wishList,
    );

    if (!productIsInWishlist) {
      const wishListProduct: WishlistProductModel = {
        id: product.id,
        addAt: new Date(),
      };
      wishList.products.push(wishListProduct);
      await this.wishlistHttpClient.saveWishlist(wishList);

      return {
        added: true,
        message: 'Product added to wishlist successfully.',
      };
    }

    return {
      added: false,
      message: 'Product is already in the wishlist.',
    };
  }

  async removeProduct(
    productId: string,
    userId: string,
  ): Promise<RemoveProductResponse> {
    const wishList: WishlistModel =
      await this.wishlistHttpClient.getWishlistByUserId(userId);

    const productIsInWishlist = this.validateProductExists(productId, wishList);

    if (!productIsInWishlist) {
      return {
        removed: false,
        message: 'Product not found in wishlist.',
      };
    }

    wishList.products = wishList.products.filter(
      (product) => product.id !== productId,
    );
    await this.wishlistHttpClient.saveWishlist(wishList);
    return {
      removed: true,
      message: 'Product removed from wishlist successfully.',
    };
  }

  async checkIfProductExists(productId: string, userId: string) {
    const wishList: WishlistModel =
      await this.wishlistHttpClient.getWishlistByUserId(userId);

    return this.validateProductExists(productId, wishList);
  }

  validateProductExists(productId: string, wishList: WishlistModel): boolean {
    if (!wishList) {
      throw new NotFoundException('Wishlist not found.');
    }

    return wishList.products.some((x) => x.id === productId);
  }

  async listProducts(userId: string) {
    const wishList: WishlistModel =
      await this.wishlistHttpClient.getWishlistByUserId(userId);

    if (!wishList) {
      throw new NotFoundException('Wishlist not found.');
    }

    const user: UserModel = await this.userService.getUserById(wishList.userId);

    const productIds: Array<string> = wishList.products.map(
      (product) => product.id,
    );

    const products: Array<ProductModel> =
      await this.fetchAllProducts(productIds);

    return {
      user: user,
      count: products.length,
      products: products,
    } as WishlistListResponseDto;
  }

  private async fetchAllProducts(
    productIds: string[],
  ): Promise<ProductModel[]> {
    return await Promise.all(
      productIds.map((id) => this.productHttpClient.getById(id)),
    );
  }
}

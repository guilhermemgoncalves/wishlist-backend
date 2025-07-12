import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductModel } from '../../../domain/models/product-model';
import { WishlistProductModel } from '../../../domain/models/wishlist-product.model';
import { AddProductResponse } from '../../dtos/add-product-response.dto';
import { AddProductRequest } from '../../dtos/add-product.request';
import { RemoveProductResponse } from '../../dtos/remove-product.response.dto';
import { WishlistListResponse } from '../../dtos/wishlist-list-response.dto';
import { UserModel } from '../../../domain/models/user-model';
import { UserService } from '../../../domain/services/user/user.service';
import { WishlistModel } from '../../../domain/models/wishlist-model';
import { ProductService } from '../../../domain/services/product/product.service';
import { WishlistService } from '../../../domain/services/wishlist/wishlist.service';

@Injectable()
export class WishlistProductService {
  constructor(
    private readonly productService: ProductService,
    private readonly userService: UserService,
    private readonly wishListService: WishlistService,
  ) {}

  async addProduct(
    product: AddProductRequest,
    userId: string,
  ): Promise<AddProductResponse> {
    const wishList: WishlistModel =
      await this.wishListService.getWishlistByUserId(userId);

    const productExists: boolean = await this.productService.productExists(
      product.id,
    );
    if (!productExists) {
      throw new NotFoundException('Product not found.');
    }

    const productIsInWishlist = this.validateProductExists(
      product.id,
      wishList,
    );

    if (wishList.products.length >= 20) {
      return {
        added: false,
        message: 'Wishlist is full. You can only add up to 20 products.',
      };
    }

    if (!productIsInWishlist) {
      const wishListProduct: WishlistProductModel = {
        id: product.id,
        addAt: new Date(),
      };
      wishList.products.push(wishListProduct);
      await this.wishListService.update(wishList);

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
      await this.wishListService.getWishlistByUserId(userId);

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
    await this.wishListService.update(wishList);
    return {
      removed: true,
      message: 'Product removed from wishlist successfully.',
    };
  }

  async checkIfProductExists(productId: string, userId: string) {
    const wishList: WishlistModel =
      await this.wishListService.getWishlistByUserId(userId);

    return this.validateProductExists(productId, wishList);
  }

  async listProducts(userId: string) {
    const wishList: WishlistModel =
      await this.wishListService.getWishlistByUserId(userId);

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
    } as WishlistListResponse;
  }

  private async fetchAllProducts(
    productIds: string[],
  ): Promise<ProductModel[]> {
    return await Promise.all(
      productIds.map((id) => this.productService.getById(id)),
    );
  }

  private validateProductExists(
    productId: string,
    wishList: WishlistModel,
  ): boolean {
    if (!wishList) {
      throw new NotFoundException('Wishlist not found.');
    }

    return wishList.products.some((x) => x.id === productId);
  }
}

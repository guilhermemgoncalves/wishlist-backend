import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { getWishlist } from '../../../__mock__/mock';
import { ProductHttpClient } from '../../interfaces/product-http-client';
import { ProductModel } from '../../models/product-model';
import { WishlistProductModel } from '../../models/wishlist-product.model';
import { AddProductResponse } from '../../../application/dtos/add-product-response.dto';
import { AddProductRequest } from '../../../application/dtos/add-product.request';
import { RemoveProductResponse } from '../../../application/dtos/remove-product.response.dto';
import { WishlistListResponseDto } from '../../../application/dtos/wishlist-list-response.dto';
import { UserModel } from '../../models/user-model';
import { UserService } from '../user/user.service';

@Injectable()
export class WishlistProductService {
  constructor(
    @Inject('ProductHttpClient')
    private readonly productHttpClient: ProductHttpClient,
    private readonly userService: UserService,
  ) {}

  async addProduct(product: AddProductRequest): Promise<AddProductResponse> {
    const wishList = getWishlist();

    if (!(await this.productHttpClient.checkIfProductExists(product.id))) {
      throw new NotFoundException('Product not found.');
    }

    const productIsInWishlist = this.checkIfProductExists(product.id);

    if (!productIsInWishlist) {
      const wishListProduct: WishlistProductModel = {
        id: product.id,
        addAt: new Date(),
      };
      wishList.products.push(wishListProduct);
      //logica pra persistir no banco do serviço REST

      return {
        added: true,
        message: 'Product added to wishlist successfully.',
      };
    }

    console.log(wishList);

    return {
      added: false,
      message: 'Product is already in the wishlist.',
    };
  }

  async removeProduct(productId: string): Promise<RemoveProductResponse> {
    const wishList = getWishlist();

    const productIsInWishlist = this.checkIfProductExists(productId);

    if (!productIsInWishlist) {
      return {
        removed: false,
        message: 'Product not found in wishlist.',
      };
    }

    const withListToUpdate = wishList.products.filter(
      (product) => product.id !== productId,
    );

    console.log(withListToUpdate);
    //logica para persistir no banco do serviço REST
    return {
      removed: true,
      message: 'Product removed from wishlist successfully.',
    };
  }

  checkIfProductExists(productId: string): boolean {
    const wishList = getWishlist();

    if (!wishList) {
      throw new NotFoundException('Wishlist not found.');
    }

    return wishList.products.some((x) => x.id === productId);
  }

  async listProducts() {
    const wishList = getWishlist();

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
      productIds.map((id) => this.productHttpClient.getProductById(id)),
    );
  }
}

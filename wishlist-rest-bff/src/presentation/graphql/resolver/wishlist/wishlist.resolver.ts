import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';

import { WishlistProductType } from '../../dto/wishlist-product.type';

import { AddProductUseCase } from '../../../../application/use-case/add-product-use-case';
import { ListProductsUseCase } from '../../../../application/use-case/list-products-use-case';
import { RemoveProductUseCase } from '../../../../application/use-case/remove-product-use-case';
import { CheckIfProductExistsUseCase } from '../../../../application/use-case/check-if-product-exists-use-case';
import { AddProductInput } from '../../dto/add-product-input';
import { AddProductResponseType } from '../../dto/add-product-response.type';
import { RemoveProductResponseType } from '../../dto/remove-product-response.type';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../../../../core/guards/gql-guard';

@Resolver()
@UseGuards(GqlAuthGuard)
export class WishlistResolver {
  constructor(
    private readonly addProductUseCase: AddProductUseCase,
    private readonly checkIfProductExistsUseCase: CheckIfProductExistsUseCase,
    private readonly listProductsUseCase: ListProductsUseCase,
    private readonly removeProductUseCase: RemoveProductUseCase,
  ) {}

  @Query(() => [WishlistProductType], { name: 'wishlistProducts' })
  async listWishlistProducts(): Promise<WishlistProductType[]> {
    const userId = '2';
    return await this.listProductsUseCase.execute(userId);
  }

  @Mutation(() => AddProductResponseType, { name: 'addProductToWishlist' })
  async addProduct(
    @Args('input') input: AddProductInput,
  ): Promise<AddProductResponseType> {
    const userId = '2';
    return this.addProductUseCase.execute(input, userId);
  }

  @Mutation(() => RemoveProductResponseType, {
    name: 'removeProductFromWishlist',
  })
  async removeProduct(
    @Args('productId') productId: string,
  ): Promise<RemoveProductResponseType> {
    const userId = '2';
    return this.removeProductUseCase.execute(productId, userId);
  }

  @Query(() => Boolean, { name: 'checkProductExistsInWishlist' })
  async checkExists(@Args('productId') productId: string): Promise<boolean> {
    const userId = '2'; // idem
    return this.checkIfProductExistsUseCase.execute(productId, userId);
  }
}

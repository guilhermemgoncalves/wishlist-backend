import { Inject, Injectable } from '@nestjs/common';
import { ProductHttpClient } from '../../interfaces/product-http-client';
import { ProductModel } from '../../models/product-model';

@Injectable()
export class ProductService {
  constructor(
    @Inject('ProductHttpClient')
    private readonly productHttpClient: ProductHttpClient,
  ) {}

  async getById(productId: string): Promise<ProductModel> {
    return this.productHttpClient.getById(productId);
  }

  async productExists(productId: string): Promise<boolean> {
    return await this.productHttpClient.checkIfProductExists(productId);
  }
}

import { ProductModel } from '../models/product-model';

export interface ProductHttpClient {
  checkIfProductExists(productId: string): Promise<boolean>;
  getById(productId: string): Promise<ProductModel>;
}

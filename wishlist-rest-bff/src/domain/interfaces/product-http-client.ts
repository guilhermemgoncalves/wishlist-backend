import { ProductModel } from '../models/product-model';

export interface ProductHttpClient {
  checkIfProductExists(productId: string): Promise<boolean>;
  getProductById(productId: string): Promise<ProductModel>;
}

import { UserModel } from '../../domain/models/user-model';
import { ProductModel } from '../../domain/models/product-model';

export interface WishlistListResponseDto {
  count: number;
  user: UserModel;
  products: Array<ProductModel>;
}

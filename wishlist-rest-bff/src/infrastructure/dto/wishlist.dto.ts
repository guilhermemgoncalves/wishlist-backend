import { ProductDto } from './product.dto';

export interface WishlistDto {
  userId: string;
  products: ProductDto[];
}

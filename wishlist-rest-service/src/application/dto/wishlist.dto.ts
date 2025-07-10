import { WishlistProductDto } from './wishlist-product.dto';

export interface WishlistDto {
  userId: string;
  products: WishlistProductDto[];
}

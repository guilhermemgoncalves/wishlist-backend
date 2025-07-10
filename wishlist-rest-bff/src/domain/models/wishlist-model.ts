import { WishlistProductModel } from './wishlist-product.model';

export interface WishlistModel {
  userId: string;
  products: WishlistProductModel[];
}

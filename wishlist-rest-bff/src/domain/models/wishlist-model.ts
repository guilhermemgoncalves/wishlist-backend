import { WishlistProductModel } from './wishlist-product.model';

export interface WishlistModel {
  id: string;
  userId: string;
  products: WishlistProductModel[];
}

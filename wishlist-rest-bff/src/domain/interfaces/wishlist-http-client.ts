import { WishlistModel } from '../models/wishlist-model';

export interface WishlistHttpClient {
  getWishlistByUserId(userId: string): Promise<WishlistModel>;
  saveWishlist(wishlist: WishlistModel): Promise<void>;
}

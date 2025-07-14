import { WishlistEntity } from '../entities/wishlist-entity';

export const WISHLIST_REPOSITORY = 'WishlistRepository';

export interface WishlistRepository {
  findByUserId(userId: string): Promise<WishlistEntity | null>;
  saveWishlist(wishlist: WishlistEntity): Promise<WishlistEntity>;
}

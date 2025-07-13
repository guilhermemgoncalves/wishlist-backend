import { WishlistDto } from '../../infrastructure/dto/wishlist.dto';

export interface WishlistHttpClient {
  getWishlistByUserId(userId: string): Promise<WishlistDto>;
  saveWishlist(wishlist: WishlistDto): Promise<void>;
}

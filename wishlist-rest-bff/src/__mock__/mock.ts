import { WishlistModel } from '../domain/models/wishlist-model';

export function getWishlist(): WishlistModel {
  return {
    userId: '2',
    products: [
      { id: '1', addAt: new Date('2025-07-09T20:16:00.000Z') },
      { id: '5', addAt: new Date('2025-07-09T20:15:00.000Z') },
      { id: '7', addAt: new Date('2025-07-09T20:14:00.000Z') },
      { id: '9', addAt: new Date('2025-07-09T20:13:00.000Z') },
    ],
  };
}

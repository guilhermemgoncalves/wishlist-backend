import { WishlistModel } from '../domain/models/wishlist-model';

export function getWishlist(): WishlistModel {
  return {
    id: '123e4567-e89b-12d3-a456-426614174000',
    userId: '2',
    products: [
      { id: '1', addAt: new Date('2025-07-09T20:16:00.000Z') },
      { id: '5', addAt: new Date('2025-07-09T20:15:00.000Z') },
      { id: '7', addAt: new Date('2025-07-09T20:14:00.000Z') },
      { id: '9', addAt: new Date('2025-07-09T20:13:00.000Z') },
    ],
  };
}

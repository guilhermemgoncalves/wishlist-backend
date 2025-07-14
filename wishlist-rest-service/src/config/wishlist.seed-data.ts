import { WishlistEntity } from '../domain/entities/wishlist-entity';
import { ObjectId } from 'mongodb';

export const wishlistSeedData = [
  {
    _id: new ObjectId('686f4b0cdaee092c03ac0120'),
    userId: '2',
    products: [
      { id: '1', addAt: new Date('2025-07-01T10:15:00.000Z') },
      { id: '2', addAt: new Date('2025-07-02T11:30:00.000Z') },
      { id: '3', addAt: new Date('2025-07-03T12:45:00.000Z') },
      { id: '4', addAt: new Date('2025-07-04T14:00:00.000Z') },
      { id: '5', addAt: new Date('2025-07-05T15:15:00.000Z') },
      { id: '6', addAt: new Date('2025-07-06T16:30:00.000Z') },
      { id: '7', addAt: new Date('2025-07-07T17:45:00.000Z') },
      { id: '8', addAt: new Date('2025-07-08T19:00:00.000Z') },
      { id: '9', addAt: new Date('2025-07-09T20:15:00.000Z') },
      { id: '10', addAt: new Date('2025-07-10T21:30:00.000Z') },
      { id: '11', addAt: new Date('2025-07-11T22:45:00.000Z') },
      { id: '12', addAt: new Date('2025-07-12T23:59:00.000Z') },
      { id: '13', addAt: new Date('2025-07-13T09:00:00.000Z') },
      { id: '14', addAt: new Date('2025-07-14T10:15:00.000Z') },
      { id: '15', addAt: new Date('2025-07-15T11:30:00.000Z') },
      { id: '16', addAt: new Date('2025-07-16T12:45:00.000Z') },
      { id: '17', addAt: new Date('2025-07-17T14:00:00.000Z') },
      { id: '18', addAt: new Date('2025-07-18T15:15:00.000Z') },
      { id: '19', addAt: new Date('2025-07-19T16:30:00.000Z') },
    ],
  },
];

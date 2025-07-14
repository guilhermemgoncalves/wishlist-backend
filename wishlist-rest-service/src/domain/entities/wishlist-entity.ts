import { Column, Entity, ObjectIdColumn } from 'typeorm';
import { WishlistProductEntity } from './wishlist-product-entity';
import { ObjectId } from 'mongodb';

@Entity('wishlists')
export class WishlistEntity {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  userId: string;

  @Column((type) => WishlistProductEntity)
  products: WishlistProductEntity[];
}

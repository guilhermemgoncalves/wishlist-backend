import { Column } from 'typeorm';

export class WishlistProductEntity {
  @Column()
  id: string;

  @Column({ default: () => 'new Date()' })
  addAt: Date;
}

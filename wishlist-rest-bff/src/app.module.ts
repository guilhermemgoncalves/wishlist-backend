import { Module } from '@nestjs/common';

import { WishlistController } from './application/controllers/wishlist/wishlist.controller';

@Module({
  imports: [],
  controllers: [WishlistController],
  providers: [],
})
export class AppModule {}

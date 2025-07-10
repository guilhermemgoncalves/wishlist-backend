import { Module } from '@nestjs/common';
import { WishlistController } from './application/controller/wishlist/wishlist.controller';
import { WishlistService } from './domain/services/wishlist/wishlist.service';
import { WishlistMongoRepositoryImpl } from './infrastructure/mongodb/wishlist-repository.impl';
import { WISHLIST_REPOSITORY } from './domain/interfaces/wishlist-repository';
import { WishlistEntity } from './domain/entities/wishlist-entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: 'mongodb://localhost:27017/wishlist-db',
      entities: [WishlistEntity],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([WishlistEntity]),
  ],
  controllers: [WishlistController],
  providers: [
    {
      provide: WISHLIST_REPOSITORY,
      useClass: WishlistMongoRepositoryImpl,
    },
    WishlistService,
  ],
})
export class AppModule {}

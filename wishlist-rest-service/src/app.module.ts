import { Module } from '@nestjs/common';
import { WishlistController } from './application/controller/wishlist/wishlist.controller';
import { WishlistService } from './domain/services/wishlist/wishlist.service';
import { WishlistMongoRepositoryImpl } from './infrastructure/mongodb/wishlist-repository.impl';
import { WISHLIST_REPOSITORY } from './domain/interfaces/wishlist-repository';
import { WishlistEntity } from './domain/entities/wishlist-entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WishlistSeeder } from './config/wishslist-mongo-seeder';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mongodb',
        url: configService.get<string>('MONGO_URL'),
        entities: [WishlistEntity],
        synchronize: true,
      }),
    }),

    TypeOrmModule.forFeature([WishlistEntity]),
  ],
  controllers: [WishlistController],
  providers: [
    WishlistSeeder,
    {
      provide: WISHLIST_REPOSITORY,
      useClass: WishlistMongoRepositoryImpl,
    },
    WishlistService,
  ],
})
export class AppModule {}

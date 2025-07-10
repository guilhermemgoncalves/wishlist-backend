import { Module } from '@nestjs/common';

import { WishlistController } from './application/controllers/wishlist/wishlist.controller';
import { HttpModule } from '@nestjs/axios';
import { AuthenticationController } from './application/controllers/authentication/authentication.controller';
import { JwtSetup } from './config/jwt-setup';
import { WishlistProductService } from './domain/use-case/wishlist-product/wishlist-product.service';
import { UserService } from './domain/use-case/user/user.service';
import { DependencyInjectionConfig } from './config/dependency-injection.config';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    HttpModule,
    JwtSetup,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [AuthenticationController, WishlistController],
  providers: [
    UserService,
    WishlistProductService,
    ...DependencyInjectionConfig,
  ],
})
export class AppModule {}

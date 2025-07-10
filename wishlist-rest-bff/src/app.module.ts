import { Module } from '@nestjs/common';

import { WishlistController } from './application/controllers/wishlist/wishlist.controller';
import { ProductHttpClientImpl } from './infrastructure/http/product-http-client.impl';
import { HttpModule } from '@nestjs/axios';
import { AuthenticationController } from './application/controllers/authentication/authentication.controller';
import { JwtSetup } from './config/jwt-setup';
import { WishlistProductService } from './domain/use-case/wishlist-product/wishlist-product.service';
import { UserHttpClientImpl } from './infrastructure/http/user-http-client-impl';
import { UserService } from './domain/use-case/user/user.service';
import { WishlistHttpClientImpl } from './infrastructure/http/wishlist-http-client.impl';

@Module({
  imports: [HttpModule, JwtSetup],
  controllers: [WishlistController, AuthenticationController],
  providers: [
    UserService,
    WishlistProductService,
    {
      provide: 'ProductHttpClient',
      useClass: ProductHttpClientImpl,
    },
    {
      provide: 'UserHttpClient',
      useClass: UserHttpClientImpl,
    },
    {
      provide: 'WishlistHttpClient',
      useClass: WishlistHttpClientImpl,
    },
  ],
})
export class AppModule {}

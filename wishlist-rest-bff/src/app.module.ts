import { Module } from '@nestjs/common';

import { HttpModule } from '@nestjs/axios';
import { JwtSetup } from './config/jwt-setup';
import { DependencyInjectionConfig } from './config/dependency-injection.config';
import { ConfigModule } from '@nestjs/config';
import { WishlistController } from './presentation/controllers/wishlist/wishlist.controller';
import { AuthenticationController } from './presentation/controllers/authentication/authentication.controller';

@Module({
  imports: [
    HttpModule,
    JwtSetup,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [AuthenticationController, WishlistController],
  providers: [...DependencyInjectionConfig],
})
export class AppModule {}

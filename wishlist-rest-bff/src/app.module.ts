import { Module } from '@nestjs/common';

import { HttpModule } from '@nestjs/axios';
import { JwtSetup } from './config/jwt-setup';
import { DependencyInjectionConfig } from './config/dependency-injection.config';
import { ConfigModule } from '@nestjs/config';

import { WishlistController } from './presentation/rest/controllers/wishlist/wishlist.controller';
import { AuthenticationController } from './presentation/rest/controllers/authentication/authentication.controller';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { WishlistResolver } from './presentation/graphql/resolver/wishlist/wishlist.resolver';
import { ApolloDriver } from '@nestjs/apollo';
import { GraphQLDateTime } from 'graphql-scalars';
import { AuthenticationResolver } from './presentation/graphql/resolver/authentication/authentication.resolver';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './config/jwt-strategy';

@Module({
  imports: [
    PassportModule,
    HttpModule,
    ...JwtSetup,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      playground: true,
      resolvers: { DateTime: GraphQLDateTime },
      driver: ApolloDriver,
      context: ({ req }) => {
        return { user: req.user };
      },
    }),
  ],
  controllers: [AuthenticationController, WishlistController],
  providers: [
    ...DependencyInjectionConfig,
    JwtStrategy,
    WishlistResolver,
    AuthenticationResolver,
  ],
  exports: [],
})
export class AppModule {}

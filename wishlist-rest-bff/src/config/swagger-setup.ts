import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AddProductResponse } from '../presentation/dtos/add-product-response.dto';
import { RemoveProductResponse } from '../presentation/dtos/remove-product.response.dto';
import { WishlistListResponse } from '../presentation/dtos/wishlist-list-response.dto';

export function setupSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('Wishlist REST BFF')
    .setDescription('Wishlist REST Backend for Frontend API documentation')
    .addBearerAuth()
    .addSecurityRequirements('bearer')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config, {
    extraModels: [
      AddProductResponse,
      RemoveProductResponse,
      WishlistListResponse,
    ],
  });
  SwaggerModule.setup('swagger-ui', app, document);
}

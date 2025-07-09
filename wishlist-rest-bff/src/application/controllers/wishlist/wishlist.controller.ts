import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AddProductDto } from '../../dtos/add-product-dto';

@Controller('wishlist')
export class WishlistController {
  constructor() {}

  @Post(':wishlistId/items')
  @ApiOperation({ summary: 'Adiciona produto à wishlist' })
  @ApiResponse({ status: 201, description: 'Produto adicionado.' })
  add(
    @Param('wishlistId') wishlistId: string,
    @Body(new ValidationPipe({ whitelist: true }))
    dto: AddProductDto,
  ) {
    return;
  }

  @Delete(':wishlistId/items/:productId')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(
    @Param('wishlistId') wishlistId: string,
    @Param('productId') productId: string,
  ) {}

  @Get(':wishlistId/items')
  list(@Param('wishlistId') wishlistId: string) {
    return;
  }

  @Get(':wishlistId/items/:productId')
  @HttpCode(HttpStatus.OK)
  exists(
    @Param('wishlistId') wishlistId: string,
    @Param('productId') productId: string,
  ) {
    return;
  }
}

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
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { AddProductDto } from '../../dtos/add-product-dto';
import { AddProductDocumentation } from '../../docs/add-product-documentation';

@Controller('wishlist')
export class WishlistController {
  constructor() {}

  @Post(':wishlistId/items')
  @AddProductDocumentation()
  add(
    @Param('wishlistId') wishlistId: string = '1234',
    @Body(new ValidationPipe()) dto: AddProductDto,
  ) {
    console.log(wishlistId);
    return;
  }

  @Delete(':wishlistId/items/:productId')
  @ApiOperation({ summary: 'Remove a wishlist product' })
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(
    @Param('wishlistId') wishlistId: string,
    @Param('productId') productId: string,
  ) {}

  @Get(':wishlistId/items')
  @ApiOperation({ summary: 'List all wishlist products' })
  list(@Param('wishlistId') wishlistId: string) {
    return;
  }

  @Get(':wishlistId/items/:productId')
  @ApiOperation({ summary: 'Checks if a wishlist product exists' })
  @HttpCode(HttpStatus.OK)
  exists(
    @Param('wishlistId') wishlistId: string,
    @Param('productId') productId: string,
  ) {
    return;
  }
}

import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Res,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { AddProductRequest } from '../../dtos/add-product.request';
import { AddProductDocumentation } from '../../documentation/add-product-documentation';
import { WishlistProductService } from '../../../domain/use-case/wishlist-product/wishlist-product.service';
import { Response } from 'express';
import { AddProductResponse } from '../../dtos/add-product-response.dto';
import { RemoveProductResponse } from '../../dtos/remove-product.response.dto';

@Controller('wishlist')
export class WishlistController {
  constructor(private readonly service: WishlistProductService) {}

  @Post('items')
  @AddProductDocumentation()
  async add(
    @Body(new ValidationPipe()) dto: AddProductRequest,
    @Res() res: Response,
  ) {
    const result: AddProductResponse = await this.service.addProduct(dto);

    const status: HttpStatus = result.added
      ? HttpStatus.CREATED
      : HttpStatus.OK;

    return res.status(status).json({
      data: result,
    });
  }

  @Delete('items/:productId')
  @ApiOperation({ summary: 'Remove a wishlist product' })
  async remove(@Param('productId') productId: string, @Res() res: Response) {
    const result: RemoveProductResponse =
      await this.service.removeProduct(productId);

    const status: HttpStatus = result.removed
      ? HttpStatus.OK
      : HttpStatus.NO_CONTENT;
    return res.status(status).json({
      data: result,
    });
  }

  @Get('items')
  @ApiOperation({ summary: 'List all wishlist products' })
  list() {
    return this.service.listProducts();
  }

  @Get('items/:productId')
  @ApiOperation({ summary: 'Checks if a wishlist product exists' })
  @HttpCode(HttpStatus.OK)
  exists(@Param('productId') productId: string) {
    return this.service.checkIfProductExists(productId);
  }
}

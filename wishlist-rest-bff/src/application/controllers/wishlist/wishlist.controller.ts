import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Req,
  Res,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { AddProductRequest } from '../../dtos/add-product.request';
import { AddProductDoc } from '../../documentation/add-product-doc';
import { WishlistProductService } from '../../../domain/use-case/wishlist-product/wishlist-product.service';
import { Response } from 'express';
import { AddProductResponse } from '../../dtos/add-product-response.dto';
import { RemoveProductResponse } from '../../dtos/remove-product.response.dto';
import { JwtAuthGuard } from '../../../core/guards/jwt-auth/jwt-auth.guard';
import { RemoveProductDoc } from '../../documentation/remove-product-doc';
import { ListWishlistProductsDoc } from '../../documentation/list-products-doc';
import { CheckExistsDoc } from '../../documentation/check-exists-doc';

@Controller('wishlist')
@UseGuards(JwtAuthGuard)
export class WishlistController {
  constructor(private readonly service: WishlistProductService) {}

  @Post('items')
  @AddProductDoc()
  async add(
    @Body(new ValidationPipe()) dto: AddProductRequest,
    @Res() res: Response,
    @Req() req: Request,
  ) {
    const userId = String(req['userId'] ?? '');
    const result: AddProductResponse = await this.service.addProduct(
      dto,
      userId,
    );

    const status: HttpStatus = result.added
      ? HttpStatus.CREATED
      : HttpStatus.OK;

    return res.status(status).json({
      data: result,
    });
  }

  @Delete('items/:productId')
  @RemoveProductDoc()
  async remove(
    @Param('productId') productId: string,
    @Res() res: Response,
    @Req() req: Request,
  ) {
    const userId = String(req['userId'] ?? '');
    const result: RemoveProductResponse = await this.service.removeProduct(
      productId,
      userId,
    );

    const status: HttpStatus = result.removed
      ? HttpStatus.OK
      : HttpStatus.NO_CONTENT;
    return res.status(status).json({
      data: result,
    });
  }

  @Get('items')
  @ListWishlistProductsDoc()
  list(@Req() req: Request) {
    const userId = String(req['userId'] ?? '');
    return this.service.listProducts(userId);
  }

  @Get('items/:productId')
  @CheckExistsDoc()
  exists(@Param('productId') productId: string, @Req() req: Request) {
    const userId = String(req['userId'] ?? '');
    return this.service.checkIfProductExists(productId, userId);
  }
}

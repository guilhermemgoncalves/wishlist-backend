import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Req,
  Res,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AddProductRequest } from '../../dtos/add-product.request.dto';
import { AddProductDoc } from '../../documentation/add-product-doc';
import { Response } from 'express';
import { AddProductResponse } from '../../dtos/add-product-response.dto';
import { RemoveProductResponse } from '../../dtos/remove-product.response.dto';
import { JwtAuthGuard } from '../../../core/guards/jwt-auth/jwt-auth.guard';
import { RemoveProductDoc } from '../../documentation/remove-product-doc';
import { ListWishlistProductsDoc } from '../../documentation/list-products-doc';
import { CheckExistsDoc } from '../../documentation/check-exists-doc';
import { AddProductUseCase } from '../../../application/use-case/add-product-use-case';
import { RemoveProductUseCase } from '../../../application/use-case/remove-product-use-case';
import { CheckIfProductExistsUseCase } from '../../../application/use-case/check-if-product-exists-use-case';
import { ListProductsUseCase } from '../../../application/use-case/list-products-use-case';

@Controller('wishlist')
@UseGuards(JwtAuthGuard)
export class WishlistController {
  constructor(
    private readonly addProductUseCase: AddProductUseCase,
    private readonly checkIfProductExistsUseCase: CheckIfProductExistsUseCase,
    private readonly listProductsUseCase: ListProductsUseCase,
    private readonly removeProductUseCase: RemoveProductUseCase,
  ) {}

  @Post('items')
  @AddProductDoc()
  async add(
    @Body(new ValidationPipe()) dto: AddProductRequest,
    @Res() res: Response,
    @Req() req: Request,
  ) {
    const userId = String(req['userId'] ?? '');
    const result: AddProductResponse = await this.addProductUseCase.execute(
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
  async remove(@Param('productId') productId: string, @Req() req: Request) {
    const userId = String(req['userId'] ?? '');
    const result: RemoveProductResponse =
      await this.removeProductUseCase.execute(productId, userId);

    return {
      data: result,
    };
  }

  @Get('items')
  @ListWishlistProductsDoc()
  list(@Req() req: Request) {
    const userId = String(req['userId'] ?? '');
    return this.listProductsUseCase.execute(userId);
  }

  @Get('items/exists/:productId')
  @CheckExistsDoc()
  exists(@Param('productId') productId: string, @Req() req: Request) {
    const userId = String(req['userId'] ?? '');
    return this.checkIfProductExistsUseCase.execute(productId, userId);
  }
}

import { Body, Controller, Get, Param, Patch, Put } from '@nestjs/common';
import { WishlistService } from '../../../application/services/wishlist/wishlist.service';
import { WishlistDto } from '../../dto/wishlist.dto';
import { ApiResponse } from '@nestjs/swagger';

@Controller('wishlist')
export class WishlistController {
  constructor(private readonly wishlistService: WishlistService) {}

  @ApiResponse({
    status: 200,
    description: 'Wishlist do usuário',
    type: WishlistDto,
  })
  @Get(':userId')
  async getUserWishList(
    @Param('userId') userId: string,
  ): Promise<WishlistDto | null> {
    return await this.wishlistService.getWishlist(userId);
  }

  @Put(':userId')
  async updateUserWishList(@Body() wishlist: WishlistDto) {
    await this.wishlistService.save(wishlist);
    return;
  }
}

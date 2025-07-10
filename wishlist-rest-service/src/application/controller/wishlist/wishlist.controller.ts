import { Body, Controller, Get, Param, Patch, Put } from '@nestjs/common';
import { WishlistService } from '../../../domain/services/wishlist/wishlist.service';
import { WishlistDto } from '../../dto/wishlist.dto';

@Controller('wishlist')
export class WishlistController {
  constructor(private readonly wishlistService: WishlistService) {}

  @Get(':userId')
  async getUserWishList(@Param('userId') userId: string) {
    return await this.wishlistService.getWishlist(userId);
  }

  @Put(':userId')
  async updateUserWishList(@Body() wishlist: WishlistDto) {
    await this.wishlistService.save(wishlist);
    return;
  }
}

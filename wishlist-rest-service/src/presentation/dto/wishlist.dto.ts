import { ApiProperty } from '@nestjs/swagger';
import { WishlistProductDto } from './wishlist-product.dto';

export class WishlistDto {
  @ApiProperty({
    description: 'ID of the user who owns the wishlist',
    example: '2',
  })
  userId: string;

  @ApiProperty({
    description: 'List of products in the wishlist',
    type: [WishlistProductDto],
  })
  products: WishlistProductDto[];
}

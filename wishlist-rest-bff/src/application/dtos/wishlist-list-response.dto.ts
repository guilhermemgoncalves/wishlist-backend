import { ApiProperty } from '@nestjs/swagger';
import { UserModel } from '../../domain/models/user-model';
import { ProductModel } from '../../domain/models/product-model';

export class WishlistListResponse {
  @ApiProperty({
    description: 'Total number of products in the wishlist',
    example: 19,
  })
  count: number;

  @ApiProperty({
    description: 'User who owns the wishlist',
  })
  user: UserModel;

  @ApiProperty({
    description: 'List of products in the wishlist',
    isArray: true,
  })
  products: Array<ProductModel>;
}

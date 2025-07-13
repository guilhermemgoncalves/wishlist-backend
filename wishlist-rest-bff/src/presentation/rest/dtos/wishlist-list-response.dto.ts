import { ApiProperty } from '@nestjs/swagger';

export class WishlistListResponse {
  @ApiProperty({
    description: 'Product unique identifier',
    example: '1',
  })
  id: string;

  @ApiProperty({
    description: 'Name of the product',
    example: 'Smartphone Samsung Galaxy S24 Ultra 256GB 5G',
  })
  name: string;

  @ApiProperty({
    description: 'Price of the product in the local currency',
    example: 13999,
  })
  price: number;

  @ApiProperty({
    description: 'Category to which the product belongs',
    example: 'Smartphones',
  })
  category: string;

  @ApiProperty({
    description: 'Date when the product was added to the wishlist',
    example: '2025-07-13T22:15:00.000Z',
    type: String,
    format: 'date-time',
  })
  addAt: Date;
}

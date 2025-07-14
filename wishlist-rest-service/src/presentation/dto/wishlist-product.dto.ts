import { ApiProperty } from '@nestjs/swagger';

export class WishlistProductDto {
  @ApiProperty({
    example: '1',
    description: 'Unique identifier of the product',
  })
  id: string;

  @ApiProperty({
    example: '2025-07-13T22:15:00.000Z',
    description: 'Date and time when the product was added to the wishlist',
    type: String,
    format: 'date-time',
  })
  addAt: Date;
}

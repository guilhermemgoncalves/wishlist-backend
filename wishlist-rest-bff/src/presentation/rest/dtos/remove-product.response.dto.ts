import { ApiProperty } from '@nestjs/swagger';

export class RemoveProductResponse {
  @ApiProperty({
    example: true,
    description: 'Indicates if the product was successfully removed',
  })
  removed: boolean;

  @ApiProperty({
    example: 'Product removed successfully.',
    description: 'Descriptive message about the operation result',
  })
  message: string;
}

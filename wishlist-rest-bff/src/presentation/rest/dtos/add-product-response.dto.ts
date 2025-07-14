import { ApiProperty } from '@nestjs/swagger';

export class AddProductResponse {
  @ApiProperty({
    example: true,
    description: 'Indicates if the product was added successfully.',
  })
  added: boolean;

  @ApiProperty({
    example: 'Product action completed successfully.',
    description: 'Descriptive message of the operation result.',
  })
  message: string;
}

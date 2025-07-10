import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

export function CheckExistsDoc() {
  return applyDecorators(
    ApiOperation({ summary: 'Checks if a wishlist product exists' }),
    ApiResponse({
      status: 200,
      description:
        'Returns true if the product exists in the wishlist, false otherwise.',
      schema: {
        example: {
          data: false,
        },
      },
    }),
  );
}

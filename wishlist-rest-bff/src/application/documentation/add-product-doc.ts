import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

export function AddProductDoc() {
  return applyDecorators(
    ApiOperation({ summary: 'Add product to wishlist' }),

    ApiResponse({
      status: 201,
      description: 'Product added successfully.',
      schema: {
        example: {
          data: {
            added: true,
            message: 'Product added to wishlist.',
          },
        },
      },
    }),

    ApiResponse({
      status: 200,
      description: 'Product already in wishlist.',
      schema: {
        example: {
          data: {
            added: false,
            message: 'Product is already in the wishlist.',
          },
        },
      },
    }),
  );
}

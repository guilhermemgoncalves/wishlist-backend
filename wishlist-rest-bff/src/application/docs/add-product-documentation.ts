import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { applyDecorators } from '@nestjs/common';

export function AddProductDocumentation() {
  return applyDecorators(
    ApiOperation({ summary: 'Adds a wishlist products' }),
    ApiResponse({ status: 201, description: 'Product Add Successfully.' }),
    ApiParam({
      name: 'wishlistId',
      type: String,
      description: 'The ID of the wihslist',
      example: '123e4567-e89b-12d3-a456-426614174000',
    }),
  );
}

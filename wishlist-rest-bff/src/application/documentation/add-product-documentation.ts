import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { applyDecorators } from '@nestjs/common';

export function AddProductDocumentation() {
  return applyDecorators(
    ApiOperation({ summary: 'Adds a wishlist products' }),
    ApiResponse({ status: 201, description: 'Product Add Successfully.' }),
  );
}

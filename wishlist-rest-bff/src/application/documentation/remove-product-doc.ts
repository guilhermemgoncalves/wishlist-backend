import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

export function RemoveProductDoc() {
  return applyDecorators(
    ApiOperation({ summary: 'Remove a wishlist product' }),
    ApiResponse({ status: 200, description: 'Product removed Successfully.' }),
  );
}

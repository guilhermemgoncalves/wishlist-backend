import { applyDecorators, Type } from '@nestjs/common';
import { ApiOperation, ApiResponse, getSchemaPath } from '@nestjs/swagger';
import { RemoveProductResponse } from '../dtos/remove-product.response.dto';

export function RemoveProductDoc() {
  return applyDecorators(
    ApiOperation({ summary: 'Remove a wishlist product' }),
    ApiResponse({
      status: 200,
      description: 'Product removed successfully.',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              data: { $ref: getSchemaPath(RemoveProductResponse) },
            },
            example: {
              data: {
                removed: true,
                message: 'Product removed from wishlist successfully.',
              },
            },
          },
        },
      },
    }),
    ApiResponse({
      status: 204,
      description: 'Product was not found in wishlist (no action needed).',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              data: { $ref: getSchemaPath(RemoveProductResponse) },
            },
            example: {
              data: {
                removed: false,
                message: 'Product was not found in wishlist.',
              },
            },
          },
        },
      },
    }),
  );
}

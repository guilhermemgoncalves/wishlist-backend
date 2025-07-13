import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

export function ListWishlistProductsDoc() {
  return applyDecorators(
    ApiOperation({ summary: 'List all wishlist products' }),

    ApiResponse({
      status: 200,
      description: 'Wishlist products listed successfully.',
      schema: {
        type: 'object',
        properties: {
          data: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                id: { type: 'string', example: '1' },
                name: {
                  type: 'string',
                  example: 'Smartphone Samsung Galaxy S24 Ultra 256GB 5G',
                },
                price: { type: 'number', example: 13999 },
                category: { type: 'string', example: 'Smartphones' },
                addAt: {
                  type: 'string',
                  format: 'date-time',
                  example: '2025-07-13T22:15:00.000Z',
                },
              },
            },
            example: [
              {
                id: '1',
                name: 'Smartphone Samsung Galaxy S24 Ultra 256GB 5G',
                price: 13999,
                category: 'Smartphones',
                addAt: '2025-07-13T22:15:00.000Z',
              },
            ],
          },
        },
      },
    }),
  );
}

import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

export function ListWishlistProductsDoc() {
  return applyDecorators(
    ApiOperation({ summary: 'List all wishlist products' }),

    ApiResponse({
      status: 200,
      description: 'Wishlist products listed successfully.',
      schema: {
        example: {
          data: {
            user: {
              id: '2',
              name: 'Bruno Lima',
              email: 'bruno@example.com',
            },
            count: 4,
            products: [
              {
                id: '1',
                name: 'Smartphone Samsung Galaxy S24 Ultra 256GB 5G',
                price: 13999,
                category: 'Smartphones',
              },
              {
                id: '2',
                name: 'Notebook Dell XPS 13 Plus Intel Core i7 512GB SSD',
                price: 8999,
                category: 'Notebooks',
              },
              {
                id: '3',
                name: "Smart TV LG 55'' OLED 4K Dolby Vision",
                price: 7499.9,
                category: 'TVs',
              },
              {
                id: '4',
                name: 'Fone Bluetooth Sony WH-1000XM5',
                price: 2199,
                category: 'Áudio',
              },
            ],
          },
        },
      },
    }),
  );
}

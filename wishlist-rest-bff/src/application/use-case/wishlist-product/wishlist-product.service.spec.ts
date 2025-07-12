import { Test, TestingModule } from '@nestjs/testing';
import { WishlistProductService } from './wishlist-product.service';

describe('AddProductService', () => {
  let service: WishlistProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WishlistProductService],
    }).compile();

    service = module.get<WishlistProductService>(WishlistProductService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

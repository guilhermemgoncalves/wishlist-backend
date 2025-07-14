import { Test, TestingModule } from '@nestjs/testing';
import { WishlistController } from './wishlist.controller';
import { WishlistProductService } from '../../use-case/wishlist-product/wishlist-product.service';
import { AddProductRequest } from '../../rest/dtos/add-product.request.dto';
import { AddProductResponse } from '../../rest/dtos/add-product-response.dto';
import { RemoveProductResponse } from '../../rest/dtos/remove-product.response.dto';
import { JwtAuthGuard } from '../../../core/guards/jwt-auth/jwt-auth.guard';
import { Response } from 'express';

describe('WishlistController', () => {
  let controller: WishlistController;
  let service: WishlistProductService;

  const mockService = {
    addProduct: jest.fn(),
    removeProduct: jest.fn(),
    listProducts: jest.fn(),
    checkIfProductExists: jest.fn(),
  };

  // Mock do response do Express
  const mockResponse = () => {
    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    return res as Response;
  };

  // Mock do JwtAuthGuard que libera o acesso
  const mockJwtAuthGuard = {
    canActivate: jest.fn(() => true),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WishlistController],
      providers: [{ provide: WishlistProductService, useValue: mockService }],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue(mockJwtAuthGuard)
      .compile();

    controller = module.get<WishlistController>(WishlistController);
    service = module.get<WishlistProductService>(WishlistProductService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('add', () => {
    it('should return CREATED when a product is added', async () => {
      const dto: AddProductRequest = { id: '123' };
      const res = mockResponse();
      const req = { userId: 'user1' };

      const result: AddProductResponse = {
        added: true,
        message: 'Product added successfully',
      };
      mockService.addProduct.mockResolvedValue(result);

      await controller.add(dto, res, req as any);

      expect(service.addProduct).toHaveBeenCalledWith(dto, 'user1');
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({ data: result });
    });

    it('should return OK when product already exists', async () => {
      const dto: AddProductRequest = { id: '123' };
      const res = mockResponse();
      const req = { userId: 'user1' };

      const result: AddProductResponse = {
        added: false,
        message: 'Product already in wishlist',
      };
      mockService.addProduct.mockResolvedValue(result);

      await controller.add(dto, res, req as any);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ data: result });
    });
  });

  describe('remove', () => {
    it('should return OK when a product is removed', async () => {
      const res = mockResponse();
      const req = { userId: 'user1' };

      const result: RemoveProductResponse = {
        removed: true,
        message: 'Product removed successfully',
      };
      mockService.removeProduct.mockResolvedValue(result);

      await controller.remove('123', res, req as any);

      expect(service.removeProduct).toHaveBeenCalledWith('123', 'user1');
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ data: result });
    });

    it('should return NO_CONTENT when product was not removed', async () => {
      const res = mockResponse();
      const req = { userId: 'user1' };

      const result: RemoveProductResponse = {
        removed: false,
        message: 'Product not found in wishlist',
      };
      mockService.removeProduct.mockResolvedValue(result);

      await controller.remove('123', res, req as any);

      expect(res.status).toHaveBeenCalledWith(204);
      expect(res.json).toHaveBeenCalledWith({ data: result });
    });
  });

  describe('list', () => {
    it('should list products for the user', async () => {
      const req = { userId: 'user1' };
      const products = [{ id: 'p1' }, { id: 'p2' }];
      mockService.listProducts.mockResolvedValue(products);

      const result = await controller.list(req as any);

      expect(result).toEqual(products);
      expect(service.listProducts).toHaveBeenCalledWith('user1');
    });
  });

  describe('exists', () => {
    it('should check if product exists in wishlist', async () => {
      const req = { userId: 'user1' };
      mockService.checkIfProductExists.mockResolvedValue(true);

      const result = await controller.exists('123', req as any);

      expect(result).toBe(true);
      expect(service.checkIfProductExists).toHaveBeenCalledWith('123', 'user1');
    });
  });
});

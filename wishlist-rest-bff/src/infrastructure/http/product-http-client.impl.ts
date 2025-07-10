import { Injectable, HttpStatus, NotFoundException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { API_URL } from '../../config/api-url-enum';
import { ProductHttpClient } from '../../domain/interfaces/product-http-client';
import { ProductModel } from 'src/domain/models/product-model';

@Injectable()
export class ProductHttpClientImpl implements ProductHttpClient {
  constructor(private readonly httpService: HttpService) {}

  async getProductById(productId: string): Promise<ProductModel> {
    try {
      const response = this.httpService.get<ProductModel>(
        `${API_URL.JSON_SERVER}/products/${productId}`,
      );

      const axiosResponse = await firstValueFrom(response);

      return axiosResponse.data;
    } catch (error) {
      if (error?.response?.status === HttpStatus.NOT_FOUND.valueOf()) {
        throw new Error('Product not found');
      }
    }
    throw new NotFoundException('PRODUCT_DOMAIN_ERROR');
  }

  async checkIfProductExists(productId: string): Promise<boolean> {
    try {
      const response = await firstValueFrom(
        this.httpService.get(`${API_URL.JSON_SERVER}/products/${productId}`),
      );
      return response.status === HttpStatus.OK.valueOf();
    } catch (error) {
      if (error?.response?.status === HttpStatus.NOT_FOUND.valueOf()) {
        return false;
      }
      throw error;
    }
  }
}

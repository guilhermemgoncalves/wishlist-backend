import { Injectable, HttpStatus, NotFoundException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { ProductHttpClient } from '../../domain/interfaces/product-http-client';
import { ProductModel } from 'src/domain/models/product-model';
import * as process from 'node:process';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ProductHttpClientImpl implements ProductHttpClient {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async getById(productId: string): Promise<ProductModel> {
    const jsonServerUrl =
      this.configService.get<string>('JSON_SERVER_URL') ||
      process.env.JSON_SERVER_URL;
    try {
      const response = this.httpService.get<ProductModel>(
        `${jsonServerUrl}/products/${productId}`,
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
        this.httpService.get(
          `${process.env.JSON_SERVER_URL}/products/${productId}`,
        ),
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

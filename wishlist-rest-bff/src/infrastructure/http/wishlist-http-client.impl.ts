import { Injectable, NotFoundException } from '@nestjs/common';
import { WishlistHttpClient } from '../../domain/interfaces/wishlist-http-client';
import { firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import process from 'node:process';
import { WishlistDto } from '../dto/wishlist.dto';

@Injectable()
export class WishlistHttpClientImpl implements WishlistHttpClient {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async getWishlistByUserId(userId: string): Promise<WishlistDto> {
    const url =
      this.configService.get<string>('SERVICE_URL') || process.env.SERVICE_URL;
    try {
      const response = this.httpService.get<WishlistDto>(
        `${url}/wishlist/${userId}`,
      );

      const axiosResponse = await firstValueFrom(response);

      return axiosResponse.data;
    } catch {
      throw new NotFoundException('WISHLIST_SERVICE_ERROR');
    }
  }

  async saveWishlist(wishlist: WishlistDto): Promise<void> {
    const url = this.configService.get<string>('SERVICE_URL') || '';
    try {
      await firstValueFrom(
        this.httpService.put(`${url}/wishlist/${wishlist.userId}`, wishlist),
      );
    } catch {
      throw new NotFoundException('WISHLIST_SERVICE_ERROR');
    }
  }
}

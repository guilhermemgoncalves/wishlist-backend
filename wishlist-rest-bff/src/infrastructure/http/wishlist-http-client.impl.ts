import { Injectable, NotFoundException } from '@nestjs/common';
import { WishlistHttpClient } from '../../domain/interfaces/wishlist-http-client';
import { WishlistModel } from 'src/domain/models/wishlist-model';
import { firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import process from 'node:process';

@Injectable()
export class WishlistHttpClientImpl implements WishlistHttpClient {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async getWishlistByUserId(userId: string): Promise<WishlistModel> {
    const url =
      this.configService.get<string>('SERVICE_URL') || process.env.SERVICE_URL;
    try {
      const response = this.httpService.get<WishlistModel>(
        `${url}/wishlist/${userId}`,
      );

      const axiosResponse = await firstValueFrom(response);

      return axiosResponse.data;
    } catch {
      throw new NotFoundException('WISHLIST_SERVICE_ERROR');
    }
  }

  async saveWishlist(wishlist: WishlistModel): Promise<void> {
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

import { Injectable, NotFoundException } from '@nestjs/common';
import { WishlistHttpClient } from '../../domain/interfaces/wishlist-http-client';
import { WishlistModel } from 'src/domain/models/wishlist-model';
import { API_URL } from '../../config/api-url-enum';
import { firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class WishlistHttpClientImpl implements WishlistHttpClient {
  constructor(private readonly httpService: HttpService) {}

  async getWishlistByUserId(userId: string): Promise<WishlistModel> {
    try {
      const response = this.httpService.get<WishlistModel>(
        `${API_URL.WISHLIST_REST_SERVICE}/wishlist/${userId}`,
      );

      const axiosResponse = await firstValueFrom(response);

      return axiosResponse.data;
    } catch {
      throw new NotFoundException('WISHLIST_SERVICE_ERROR');
    }
  }

  async saveWishlist(wishlist: WishlistModel): Promise<void> {
    try {
      await firstValueFrom(
        this.httpService.put(
          `${API_URL.WISHLIST_REST_SERVICE}/wishlist/${wishlist.userId}`,
          wishlist,
        ),
      );
    } catch {
      throw new NotFoundException('WISHLIST_SERVICE_ERROR');
    }
  }
}

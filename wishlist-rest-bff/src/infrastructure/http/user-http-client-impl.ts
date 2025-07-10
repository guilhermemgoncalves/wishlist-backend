import { Injectable, HttpStatus, NotFoundException } from '@nestjs/common';
import { UserHttpClient } from '../../domain/interfaces/user-http-client';
import { HttpService } from '@nestjs/axios';
import { UserModel } from 'src/domain/models/user-model';
import { API_URL } from '../../config/api-url-enum';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class UserHttpClientImpl implements UserHttpClient {
  constructor(private readonly httpService: HttpService) {}

  async getUserById(userId: string): Promise<UserModel> {
    try {
      const response = this.httpService.get<UserModel>(
        `${API_URL.JSON_SERVER}/users/${userId}`,
      );

      const axiosResponse = await firstValueFrom(response);

      return axiosResponse.data;
    } catch (error) {
      if (error?.response?.status === HttpStatus.NOT_FOUND.valueOf()) {
        throw new Error('user not found');
      }
      throw new NotFoundException('USER_DOMAIN_ERROR');
    }
  }
}

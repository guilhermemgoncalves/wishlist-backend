import { Injectable, HttpStatus, NotFoundException } from '@nestjs/common';
import { UserHttpClient } from '../../domain/interfaces/user-http-client';
import { HttpService } from '@nestjs/axios';
import { UserModel } from 'src/domain/models/user-model';
import { firstValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserHttpClientImpl implements UserHttpClient {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async getUserById(userId: string): Promise<UserModel> {
    const jsonServerUrl =
      this.configService.get<string>('JSON_SERVER_URL') || '';

    try {
      const response = this.httpService.get<UserModel>(
        `${jsonServerUrl}/users/${userId}`,
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

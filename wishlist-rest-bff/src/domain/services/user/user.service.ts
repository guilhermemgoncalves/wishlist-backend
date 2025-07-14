import { Inject, Injectable } from '@nestjs/common';
import { UserHttpClient } from '../../interfaces/user-http-client';
import { UserModel } from '../../models/user-model';

@Injectable()
export class UserService {
  constructor(
    @Inject('UserHttpClient')
    private readonly userHttpClient: UserHttpClient,
  ) {}

  async getUserById(userId: string): Promise<UserModel> {
    return this.userHttpClient.getUserById(userId);
  }
}

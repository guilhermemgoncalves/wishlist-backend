import { UserModel } from '../models/user-model';

export interface UserHttpClient {
  getUserById(productId: string): Promise<UserModel>;
}

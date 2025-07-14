import { Resolver, Mutation } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
import { AUTHENTICATION_CONFIG } from '../../../../config/authentication-config';

@Resolver()
export class AuthenticationResolver {
  constructor(private readonly jwtService: JwtService) {}

  @Mutation(() => String)
  generateToken(): string {
    const userId = AUTHENTICATION_CONFIG.MOCK_USER_ID;

    if (!userId) {
      throw new Error('User not authenticated');
    }

    return this.jwtService.sign({ sub: userId }, { expiresIn: '7d' });
  }
}

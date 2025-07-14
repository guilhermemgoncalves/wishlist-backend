import { Controller, Get, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AUTHENTICATION_CONFIG } from '../../../../config/authentication-config';
import { UserModel } from '../../../../domain/models/user-model';
import { UserService } from '../../../../domain/services/user/user.service';

//mock controller that's generates a JWT token
@Controller('authentication')
export class AuthenticationController {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  @Get('get-token')
  async generateToken(): Promise<{ token: string }> {
    const payload = { sub: AUTHENTICATION_CONFIG.MOCK_USER_ID };
    const user: UserModel = await this.userService.getUserById(
      AUTHENTICATION_CONFIG.MOCK_USER_ID.toString(),
    );
    if (!user) {
      throw new UnauthorizedException('Invalid Token format');
    }
    const token = this.jwtService.sign(payload);
    return { token };
  }
}

import { Controller, Get } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AUTHENTICATION_CONFIG } from '../../../config/authentication-config';

//mock controller that's generates a JWT token
@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly jwtService: JwtService) {}

  @Get('get-token')
  generateToken(): { token: string } {
    const payload = { sub: AUTHENTICATION_CONFIG.MOCK_USER_ID };
    const token = this.jwtService.sign(payload);
    return { token };
  }
}

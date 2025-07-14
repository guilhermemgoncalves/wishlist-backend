// src/infrastructure/security/jwt.strategy.ts

import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AUTHENTICATION_CONFIG } from './authentication-config';

const JWT_SECRET: string = AUTHENTICATION_CONFIG.JWT_SECRET;

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: JWT_SECRET, // ou use ConfigService
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub, email: payload.email };
  }
}

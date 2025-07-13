import { JwtModule } from '@nestjs/jwt';
import { AUTHENTICATION_CONFIG } from './authentication-config';

const JWT_SECRET: string = AUTHENTICATION_CONFIG.JWT_SECRET;

export const JwtSetup = JwtModule.register({
  secret: JWT_SECRET,
  signOptions: { expiresIn: '7d' },
});

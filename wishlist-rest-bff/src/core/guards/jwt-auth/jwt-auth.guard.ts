import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const authHeader = String(request.headers['authorization'] || '');

    if (!authHeader?.startsWith('Bearer ')) {
      throw new UnauthorizedException('Invalid Token format');
    }

    const token = authHeader.split(' ')[1];

    try {
      const payload: { sub: string } = this.jwtService.verify(token);
      request['userId'] = payload.sub;
      return true;
    } catch {
      throw new UnauthorizedException('Invalid or expired Token');
    }
  }
}

import {
  CallHandler,
  ExecutionContext,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Response } from 'express';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const res = ctx.getResponse<Response>();

    return next.handle().pipe(
      map((data) => {
        const isEmpty =
          data === null ||
          data === undefined ||
          (Array.isArray(data) && data.length === 0);

        const count = Array.isArray(data) ? data.length : 0;

        const status: HttpStatus = isEmpty
          ? HttpStatus.NO_CONTENT
          : HttpStatus.OK;

        res.status(status);

        return {
          count: count ? count : null,
          data: isEmpty ? null : data,
        };
      }),
    );
  }
}

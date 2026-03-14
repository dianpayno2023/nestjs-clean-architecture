import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Response } from 'express';
import { map, Observable } from 'rxjs';
import {
  ApiResponse,
  ResponsePayload,
} from '../interfaces/api-response.interface';

@Injectable()
export class ResponseInterceptor<T>
  implements NestInterceptor<ResponsePayload<T>, ApiResponse<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler<ResponsePayload<T>>,
  ): Observable<ApiResponse<T>> {
    const response = context.switchToHttp().getResponse<Response>();

    return next.handle().pipe(
      map((result) => ({
        code: response.statusCode,
        status: 'success',
        message: result.message,
        data: result.data,
        metadata: result.meta ?? null,
      })),
    );
  }
}

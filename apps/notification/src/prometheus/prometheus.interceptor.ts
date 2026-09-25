import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Observable, finalize } from 'rxjs';
import { PrometheusService } from './prometheus.service';

type RoutedRequest = Omit<Request, 'route'> & {
  route?: {
    path?: string;
  };
};

@Injectable()
export class PrometheusInterceptor implements NestInterceptor {
  constructor(private readonly prometheusService: PrometheusService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    if (context.getType() !== 'http') {
      return next.handle();
    }

    const request = context.switchToHttp().getRequest<RoutedRequest>();
    const response = context.switchToHttp().getResponse<Response>();
    const start = process.hrtime.bigint();

    return next.handle().pipe(
      finalize(() => {
        const durationSeconds =
          Number(process.hrtime.bigint() - start) / 1_000_000_000;
        const route = request.route?.path ?? request.path;

        this.prometheusService.recordHttpRequest(
          request.method,
          route,
          response.statusCode,
          durationSeconds,
        );
      }),
    );
  }
}

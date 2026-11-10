import { Injectable, OnModuleInit } from '@nestjs/common';
import {
  collectDefaultMetrics,
  Counter,
  Histogram,
  Registry,
} from 'prom-client';

@Injectable()
export class PrometheusService implements OnModuleInit {
  readonly registry = new Registry();
  readonly contentType = this.registry.contentType;
  readonly httpRequestsTotal = new Counter({
    name: 'notification_http_requests_total',
    help: 'Total number of HTTP requests handled by the notification service',
    labelNames: ['method', 'route', 'status_code'],
    registers: [this.registry],
  });
  readonly httpRequestDuration = new Histogram({
    name: 'notification_http_request_duration_seconds',
    help: 'HTTP request duration in seconds for the notification service',
    labelNames: ['method', 'route', 'status_code'],
    buckets: [0.005, 0.01, 0.025, 0.05, 0.1, 0.25, 0.5, 1, 2, 5],
    registers: [this.registry],
  });

  onModuleInit() {
    collectDefaultMetrics({
      register: this.registry,
      prefix: 'notification_',
    });
  }

  getMetrics(): Promise<string> {
    return this.registry.metrics();
  }

  recordHttpRequest(
    method: string,
    route: string,
    statusCode: number,
    durationSeconds: number,
  ) {
    const labels = {
      method,
      route,
      status_code: String(statusCode),
    };

    this.httpRequestsTotal.inc(labels);
    this.httpRequestDuration.observe(labels, durationSeconds);
  }
}

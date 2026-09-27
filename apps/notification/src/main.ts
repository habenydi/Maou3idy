import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { Logger } from 'nestjs-pino';
import { PrometheusInterceptor } from './prometheus/prometheus.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  app.useLogger(app.get(Logger));
  app.useGlobalInterceptors(app.get(PrometheusInterceptor));

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RABBITMQ_URL!],
      queue: 'notification_events',
      exchange: 'domain_events',
      exchangeType: 'topic',
      wildcards: true,
      queueOptions: {
        durable: true,
      },
    },
  });

  await app.startAllMicroservices();
  await app.listen(process.env.PORT ?? 8082);
}

bootstrap();

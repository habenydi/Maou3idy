import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { Transport, MicroserviceOptions } from "@nestjs/microservices";
import cookieParser from "cookie-parser";
import { ValidationPipe } from "@nestjs/common";
import { JwtGuard } from "./auth/guards/jwt.guard";
import { Logger } from "nestjs-pino";
import { PrometheusInterceptor } from "./prometheus/prometheus.interceptor";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  app.useLogger(app.get(Logger));

  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  if (!process.env.RABBITMQ_URL) {
    throw new Error("RABBITMQ_URL is not set — check your .env");
  }

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RABBITMQ_URL],
      queue: "slots_events",
      exchange: "domain_events",
      exchangeType: "topic",
      wildcards: true,
      queueOptions: {
        durable: true,
      },
    },
  });

  app.useGlobalGuards(app.get(JwtGuard));
  app.useGlobalInterceptors(app.get(PrometheusInterceptor));
  await app.startAllMicroservices();
  await app.listen(process.env.PORT ?? 8083);
}
bootstrap();

import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import cookieParser from "cookie-parser";
import { MetricsInterceptor } from "./metrics/metrics.interceptor";
import { JwtGuard } from "./auth/guards/jwt.guard";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";

import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Was hardcoded to the gateway's own port (8080) — CORS "origin" needs to
  // be where the *browser page* is served from (the frontend), not the
  // gateway it's calling through. Now driven by the same FRONTEND_URL env
  // var everything else already uses.
  app.enableCors({
    origin: [process.env.FRONTEND_URL ?? "http://localhost:3000"],
  });
  app.use(cookieParser());
  app.useGlobalGuards(app.get(JwtGuard));
  app.useGlobalInterceptors(app.get(MetricsInterceptor));
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  if (!process.env.RABBITMQ_URL) {
    throw new Error("RABBITMQ_URL is not set — check your .env");
  }

  // Without this, AuthEventListenerModule's @EventPattern handlers (audit
  // logs, in-app notifications, doctor/user stats for appointment.* events)
  // are dead code: this app never joins the RabbitMQ bus as a consumer, so
  // nothing is ever delivered to them.
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RABBITMQ_URL],
      // Own queue bound (via wildcards) to a shared topic exchange, so this
      // service gets a copy of every event it handles instead of competing
      // with slots/notification for messages off one shared queue.
      queue: "auth_events",
      exchange: "domain_events",
      exchangeType: "topic",
      wildcards: true,
      queueOptions: {
        durable: true,
      },
    },
  });
  await app.startAllMicroservices();

  await app.listen(process.env.PORT ?? 8000);
}
void bootstrap();

import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { Transport, MicroserviceOptions } from "@nestjs/microservices";
import cookieParser from "cookie-parser";
import { ValidationPipe } from "@nestjs/common";
import { JwtGuard } from "./auth/guards/jwt.guard";

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
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  if (!process.env.RABBITMQ_URL) {
    throw new Error("RABBITMQ_URL is not set — check your .env");
  }

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RABBITMQ_URL],
      // Own queue bound (via wildcards) to a shared topic exchange, so this
      // service gets a copy of every event it handles instead of competing
      // with auth/notification for messages off one shared queue.
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
  await app.startAllMicroservices();
  await app.listen(process.env.PORT ?? 1339);
}
bootstrap();

import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { Transport, MicroserviceOptions } from "@nestjs/microservices";
import cookieParser from "cookie-parser";
import { ValidationPipe } from "@nestjs/common";
import { JwtGuard } from "./auth/guards/jwt.guard";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: "http://localhost:3000", // Change this to match your actual frontend URL
    credentials: true,
  });

  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RABBITMQ_URL || "amqp://localhost:5672"],
      queue: "events",
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

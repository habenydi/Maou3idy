import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import cookieParser from "cookie-parser";
import { MetricsInterceptor } from "./metrics/metrics.interceptor";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: process.env.FRONTEND_URL ?? "http://localhost:3000",
    credentials: true,
  });
  app.use(cookieParser());
  app.useGlobalInterceptors(app.get(MetricsInterceptor));
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );
  await app.listen(process.env.PORT ?? 8000);
}
bootstrap();

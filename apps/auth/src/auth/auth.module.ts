import { Module, forwardRef } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtModule } from "@nestjs/jwt";
import { JwtGuard } from "./guards/jwt.guard";
import { PrismaModule } from "src/prisma/prisma.module";
import { DoctorModule } from "src/doctor/doctor.module";
import { RolesGuard } from "./guards/roles.guard";
import { GoogleStrategy } from "./google.strategy";
import { MetricsService } from "src/metrics/metrics.service";

import { UsersModule } from "src/users/users.module";

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.SECRET_KEY || "Yassir_SecretKey",
      signOptions: { expiresIn: "1h" },
    }),
    PrismaModule,
    UsersModule,
    forwardRef(() => DoctorModule),
  ],
  controllers: [AuthController],
  providers: [
    {
      provide: "APP_GUARD",
      useClass: JwtGuard,
    },
    AuthService,
    JwtGuard,
    RolesGuard,
    GoogleStrategy,
    MetricsService,
  ],
  exports: [JwtModule, JwtGuard, RolesGuard],
})
export class AuthModule {}

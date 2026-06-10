import { Module, forwardRef } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtModule } from "@nestjs/jwt";
import { UsersService } from "src/users/users.service";
import { JwtGuard } from "./guards/jwt.guard";
import { PrismaModule } from "src/prisma/prisma.module";
import { DoctorModule } from "src/doctor/doctor.module";
import { RolesGuard } from "./guards/roles.guard";
import { GoogleStrategy } from "./google.strategy";

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.SECRET_KEY || "Yassir_SecretKey",
      signOptions: { expiresIn: "1h" },
    }),
    PrismaModule,
    forwardRef(() => DoctorModule),
  ],
  controllers: [AuthController],
  providers: [AuthService, UsersService, JwtGuard, RolesGuard, GoogleStrategy],
  exports: [JwtModule, JwtGuard, RolesGuard],
})
export class AuthModule {}

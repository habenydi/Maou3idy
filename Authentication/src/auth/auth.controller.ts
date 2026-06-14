import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  Res,
  UseGuards,
} from "@nestjs/common";
import { Request } from "express";
import type { Response } from "express";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";
import { RegisterDto } from "./dto/register.dto";
import { JwtGuard } from "./guards/jwt.guard";
import { ForgetPasswordDto } from "./dto/forget_password.dto";
import { ChangePasswordDto } from "./dto/ChangePassword.dto";
import { DoctorRegisterDto } from "./dto/DoctorRegister.dto";
import { Role } from "@prisma/client";
import { AuthGuard } from "@nestjs/passport/dist/auth.guard";
interface UserAuth {
  sub: number;
  id: number;
  email: string;
  name: string;
  role: Role;
  verified: boolean;
  token: string;
}
export interface UserGoogleAuth {
  id: number;
  email: string;
  name: string;
  access_token: string;
  refresh_token: string;
}
interface RequestWithUser extends Request {
  user: UserAuth;
}

@Controller("auth")
export class AuthController {
  constructor(private Authservice: AuthService) {}
  @Get("google")
  @UseGuards(AuthGuard("google"))
  async googleAuth() {}

  @Get("google/callback")
  @UseGuards(AuthGuard("google"))
  googleCallback(@Req() req: RequestWithUser, @Res() res: Response) {
    const token = req.user.token;
    const user = {
      id: req.user.id,
      email: req.user.email,
      name: req.user.name,
      role: req.user.role,
      verified: req.user.verified,
      token: req.user.token,
    };

    // Encode data for URL
    const encodedUser = Buffer.from(JSON.stringify(user)).toString("base64");

    // Redirect to frontend callback page with encoded data
    res.redirect(
      `${process.env.FRONTEND_URL || "http://localhost:3000"}/auth/callback?token=${token}&user=${encodedUser}`,
    );
  }
  @Post("register")
  register(@Body() body: RegisterDto) {
    return this.Authservice.register(body);
  }
  @Post("login")
  login(@Body() body: LoginDto) {
    return this.Authservice.login(body);
  }
  @Post("forgot-password")
  forget(@Body() body: ForgetPasswordDto) {
    return this.Authservice.forget_password(body);
  }
  @Get("verify_email/token=:token")
  verify_email(@Param("token") token: string) {
    return this.Authservice.verify_email(token);
  }
  @Patch("reset-password/token=:token")
  reset_password(
    @Param("token") token: string,
    @Body("new_password") new_password: string,
  ) {
    return this.Authservice.reset_password(token, new_password);
  }
  @UseGuards(JwtGuard)
  @Patch("change-password")
  change_password(
    @Body() ChangePassword: ChangePasswordDto,
    @Req() req: RequestWithUser,
  ) {
    const id = Number(req.user.sub);
    const { old_password, new_password } = ChangePassword;
    return this.Authservice.change_password(id, old_password, new_password);
  }
  @UseGuards(JwtGuard)
  @Get("me")
  getMe(@Req() req: RequestWithUser): UserAuth {
    return req.user;
  }
  @Post("doctor-register")
  doctor_register(@Body() body: DoctorRegisterDto) {
    return this.Authservice.doctor_register(body);
  }
}

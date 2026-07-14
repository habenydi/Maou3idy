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
import type { Response, Request } from "express";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";
import { RegisterDto } from "./dto/register.dto";
import { JwtGuard } from "./guards/jwt.guard";
import { ForgetPasswordDto } from "./dto/forget_password.dto";
import { ChangePasswordDto } from "./dto/ChangePassword.dto";
import { DoctorRegisterDto } from "./dto/DoctorRegister.dto";
import { Role } from "@prisma/client";
import { AuthGuard } from "@nestjs/passport/dist/auth.guard";
import { MetricsService } from "src/metrics/metrics.service";

interface UserAuth {
  sub: number;
  id: number;
  email: string;
  verified: boolean;
  name: string;
  role: Role;
  token: string;
  doctor?: {
    id: number;
    specialty: string;
    location: string;
    experience: number;
    bio: string;
    rating: number;
    totalPatients: number;
    languages: string[];
    reviewsCount: number;
    profileImage: string;
    speciality: string;
  };
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
  constructor(
    private Authservice: AuthService,
    private MetricsService: MetricsService,
  ) {}
  @Get("google")
  @UseGuards(AuthGuard("google"))
  async googleAuth() {}

  @Get("google/callback")
  @UseGuards(AuthGuard("google"))
  async googleCallback(@Req() req: RequestWithUser, @Res() res: Response) {
    const user = req.user;
    const token = this.Authservice.generateTokenForGoogleUser(user);
    res.cookie("access_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000,
    });
    await this.MetricsService.incrementSession();
    res.redirect(`http://localhost:3000/google-callback`);
  }

  @Get("verify/:token")
  verifyToken(@Param("token") token: string) {
    const isValid = this.Authservice.verifyJwtToken(token);
    if (isValid) {
      return { valid: true };
    } else {
      return { valid: false };
    }
  }

  // @Get("verify_email/token=:token")
  // async verifyEmail(@Param("token") token: string, @Res() res: Response) {
  //   const isValid = await this.Authservice.verify_email(token);
  //   if (isValid) {
  //     res.redirect(`http://localhost:3000/login?verified=true`);
  //   } else {
  //     res.redirect(`http://localhost:3000/login?verified=false`);
  //   }
  // }
  @Post("register")
  async register(
    @Body() body: RegisterDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await this.Authservice.register(body);
    res.cookie("access_token", result.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000,
    });
    await this.MetricsService.incrementSession();
    return { user: result.user };
  }
  @Post("login")
  async login(
    @Body() body: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await this.Authservice.login(body);

    res.cookie("access_token", result.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000,
    });

    await this.MetricsService.incrementSession();
    return {
      user: result.user,
    };
  }
  @Post("forgot-password")
  async forget(@Body() body: ForgetPasswordDto) {
    await this.MetricsService.incrementSession();
    return await this.Authservice.forget_password(body);
  }
  @Get("verify_email/token=:token")
  async verify_email(@Param("token") token: string) {
    return await this.Authservice.verify_email(token);
  }
  @Patch("reset-password/token=:token")
  async reset_password(
    @Param("token") token: string,
    @Body("new_password") new_password: string,
  ) {
    return await this.Authservice.reset_password(token, new_password);
  }
  @UseGuards(JwtGuard)
  @Patch("change-password")
  async change_password(
    @Body() ChangePassword: ChangePasswordDto,
    @Req() req: RequestWithUser,
  ) {
    const { old_password, new_password } = ChangePassword;
    return await this.Authservice.change_password(
      String(req.user.sub),
      old_password,
      new_password,
    );
  }
  @UseGuards(JwtGuard)
  @Get("me")
  getMe(@Req() req: RequestWithUser): UserAuth {
    return req.user;
  }
  @Post("doctor-register")
  async doctor_register(@Body() body: DoctorRegisterDto) {
    return await this.Authservice.doctor_register(body);
  }
  @Post("logout")
  async logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie("access_token");
    await this.MetricsService.decrementSession();
    return {
      message: "Logged out successfully",
      success: true,
    };
  }
}

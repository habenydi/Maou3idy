import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";
import { RegisterDto } from "./dto/register.dto";
import { JwtGuard } from "./jwt/jwt.guard";
import { ForgetPasswordDto } from "./dto/forget_password.dto";
import { ChangePasswordDto } from "./dto/ChangePassword.dto";
import { DoctorRegisterDto } from "./dto/DoctorRegister.dto";
interface UserAuth {
  sub: number;
  email: string;
}
interface RequestWithUser extends Request {
  user: UserAuth;
}
@Controller("auth")
export class AuthController {
  constructor(private Authservice: AuthService) {}
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
    @Req() req: { user: { sub: string } },
  ) {
    const id = parseInt(req.user.sub, 10);
    console.log("User ID from JWT:", id);
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

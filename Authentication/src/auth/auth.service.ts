import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { LoginDto } from "./dto/login.dto";
import { RegisterDto } from "./dto/register.dto";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "src/users/users.service";
import { ForgetPasswordDto } from "./dto/forget_password.dto";
import { MailerService } from "@nestjs-modules/mailer";
import { Role } from "@prisma/client";
import { DoctorRegisterDto } from "./dto/DoctorRegister.dto";
import { DoctorService } from "src/doctor/doctor.service";

interface JwtPayload {
  sub: number;
  email: string;
}

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private UserService: UsersService,
    private readonly email: MailerService,
    private readonly doctorService: DoctorService,
  ) {}
  async hashPassword(password: string) {
    return await bcrypt.hash(password, 10);
  }
  async compare(password: string, hashed: string) {
    return await bcrypt.compare(password, hashed);
  }
  async register(body: RegisterDto) {
    const hashedPassword = await this.hashPassword(body.password);
    if (await this.UserService.findByEmail(body.email)) {
      throw new BadRequestException("Email already exists");
    }
    const user = await this.UserService.create({
      ...body,
      password: hashedPassword,
    });

    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };
    const token = this.jwtService.sign(payload);
    const url = `http://localhost:3000/verification-email?token=${encodeURIComponent(token)}`;
    await this.email.sendMail({
      to: user.email,
      subject: "Verify your email",
      text: `Please click the following link to verify your email: ${url}`,
      html: `<p>Please click the following link to verify your email:</p><p><a href="${url}">${url}</a></p>`,
    });
    return {
      statusCode: 201,
      message: "User registered successfully",
      token: token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        phone: user.phone,
        role: String(user.role),
      },
    };
  }
  async login(Body: LoginDto) {
    const user = await this.UserService.findByEmail(Body.email);
    if (!user) {
      throw new UnauthorizedException("User not found");
    }
    const isMatched = await this.compare(Body.password, user.password);
    if (!isMatched) {
      throw new UnauthorizedException("Wrong password");
    }
    const playload = { sub: user.id, email: user.email, role: user.role };
    const token = this.jwtService.sign(playload);
    return {
      statusCode: 200,
      Message: "Login success",
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        phone: user.phone,
        role: String(user.role),
      },
      token: token,
    };
  }
  async forget_password(ForgetPasswordDto: ForgetPasswordDto) {
    const user = await this.UserService.findByEmail(ForgetPasswordDto.email);
    if (!user) {
      throw new BadRequestException("User not found");
    }
    const url = `http://localhost:3000/reset-password/?token=${this.jwtService.sign({ sub: user.id, email: user.email, role: user.role })}`;
    await this.email.sendMail({
      to: user.email,
      subject: "Reset your password",
      text: `Please click the following link to reset your password: ${url}`,
      html: `<p>Please click the following link to reset your password:</p><p><a href="${url}">${url}</a></p>`,
    });
    return {
      statusCode: 200,
      message: "Password reset link has been sent to your email",
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        phone: user.phone,
        role: String(user.role),
      },
    };
  }
  async reset_password(token: string, new_password: string) {
    try {
      const decoded = this.jwtService.verify<JwtPayload>(token);
      const user = await this.UserService.findByEmail(decoded.email);
      if (!user) {
        throw new BadRequestException("User not found");
      }
      const hashedPassword = await this.hashPassword(new_password);
      await this.UserService.update(user.id, { password: hashedPassword });
      await this.verify_email(token);
      return {
        statusCode: 200,
        message: "Password reset successful",
        token: token,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          phone: user.phone,
          role: String(user.role),
        },
      };
    } catch (error) {
      console.error("Error resetting password:", error);
      throw new ForbiddenException("Invalid or expired token");
    }
  }
  async verify_email(token: string) {
    try {
      const decoded = this.jwtService.verify<JwtPayload>(token);
      const user = await this.UserService.findByEmail(decoded.email);
      if (!user) {
        throw new BadRequestException("User not found");
      }
      await this.UserService.update(user.id, { verified: true });
      return {
        statusCode: 200,
        message: "Email verified successfully",
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          phone: user.phone,
          role: String(user.role),
        },
      };
    } catch (error) {
      console.error("Error verifying email:", error);
      throw new ForbiddenException("Invalid or expired token");
    }
  }
  async change_password(
    userId: number,
    old_password: string,
    new_password: string,
  ) {
    const user = await this.UserService.findById(userId);
    if (!user) {
      throw new BadRequestException("User not found");
    }
    const isMatched = await this.compare(old_password, user.password);
    if (!isMatched) {
      throw new UnauthorizedException("Wrong password");
    }
    const hashedPassword = await this.hashPassword(new_password);
    await this.UserService.update(user.id, { password: hashedPassword });
    return {
      statusCode: 200,
      message: "Password changed successfully",
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        phone: user.phone,
        role: String(user.role),
      },
    };
  }
  async doctor_register(body: DoctorRegisterDto) {
    const hashedPassword = await this.hashPassword(body.password);
    const user = await this.UserService.findByEmail(body.email);
    if (!user) {
      throw new BadRequestException("the email does not exist");
    }
    if (user.verified === false) {
      throw new BadRequestException("the email is not verified");
    }
    if (String(user.role) !== Role.USER) {
      throw new BadRequestException(
        "the user is already a doctor or pending doctor",
      );
    }

    await this.UserService.update(user.id, {
      password: hashedPassword,
      role: Role.PENDING_DOCTOR,
    });
    await this.doctorService.create(body, user.id);
    return {
      statusCode: 200,
      message: "Doctor registration request submitted successfully",
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        phone: user.phone,
        role: Role.PENDING_DOCTOR,
      },
    };
  }
}

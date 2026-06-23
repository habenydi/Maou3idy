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
import { JwtPayload } from "./guards/jwt.guard";

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private UserService: UsersService,
    private readonly email: MailerService,
    private readonly doctorService: DoctorService,
  ) {}

  private get frontendBaseUrl() {
    return process.env.FRONTEND_URL ?? "http://127.0.0.1:3000";
  }

  private signToken(payload: JwtPayload, expiresIn: string) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return this.jwtService.sign(payload, { expiresIn } as any);
  }

  private ensurePasswordStrength(password: string) {
    if (password.length < 8) {
      throw new BadRequestException("Password must be at least 8 characters");
    }
  }
  async hashPassword(password: string) {
    return await bcrypt.hash(password, 10);
  }
  async compare(password: string, hashed: string) {
    return await bcrypt.compare(password, hashed);
  }
  private normalizeEmail(email: string) {
    return email.trim().toLowerCase();
  }
  async register(body: RegisterDto) {
    this.ensurePasswordStrength(body.password);
    const email = this.normalizeEmail(body.email);
    const hashedPassword = await this.hashPassword(body.password);
    if (await this.UserService.findByEmail(email)) {
      throw new BadRequestException("Email already exists");
    }
    const user = await this.UserService.create({
      ...body,
      email,
      password: hashedPassword,
    });

    const payload: JwtPayload = {
      sub: String(user.id),
      name: user.name,
      email: user.email,
      role: user.role,
      verified: user.verified,
    };
    const token = this.signToken(payload, "15m");
    const url = `${this.frontendBaseUrl}/verification-email?token=${encodeURIComponent(token)}`;
    await this.email.sendMail({
      to: email,
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
        verified: user.verified,
        role: String(user.role),
      },
    };
  }
  async login(Body: LoginDto) {
    const email = this.normalizeEmail(Body.email);
    const user = await this.UserService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException("User not found");
    }
    const isMatched = await this.compare(Body.password, user.password);
    if (!isMatched) {
      throw new UnauthorizedException("Wrong password");
    }
    const payload: JwtPayload = {
      sub: String(user.id),
      name: user.name,
      email: user.email,
      role: user.role,
      verified: user.verified,
    };
    const token = this.signToken(payload, "1d");
    return {
      statusCode: 200,
      Message: "Login success",
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        phone: user.phone,
        role: String(user.role),
        verified: user.verified,
      },
      token: token,
    };
  }
  async forget_password(ForgetPasswordDto: ForgetPasswordDto) {
    const email = this.normalizeEmail(ForgetPasswordDto.email);
    const user = await this.UserService.findByEmail(email);
    if (!user) {
      return {
        statusCode: 200,
        message:
          "If an account exists, a reset link has been sent to your email",
      };
    }
    const payload: JwtPayload = {
      sub: String(user.id),
      name: user.name,
      email: user.email,
      role: user.role,
      verified: user.verified,
    };
    const token = this.signToken(payload, "15m");
    const url = `${this.frontendBaseUrl}/reset-password/?token=${encodeURIComponent(token)}`;
    await this.email.sendMail({
      to: email,
      subject: "Reset your password",
      text: `Please click the following link to reset your password: ${url}`,
      html: `<p>Please click the following link to reset your password:</p><p><a href="${url}">${url}</a></p>`,
    });
    return {
      statusCode: 200,
      message: "If an account exists, a reset link has been sent to your email",
    };
  }
  async reset_password(token: string, new_password: string) {
    this.ensurePasswordStrength(new_password);
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
          verified: user.verified,
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
          verified: true,
        },
      };
    } catch (_error) {
      console.error("Error verifying email:", _error);
      throw new ForbiddenException("Invalid or expired token");
    }
  }
  async change_password(
    userId: number,
    old_password: string,
    new_password: string,
  ) {
    this.ensurePasswordStrength(new_password);
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
    this.ensurePasswordStrength(body.password);
    const email = this.normalizeEmail(body.email);
    const hashedPassword = await this.hashPassword(body.password);
    const user = await this.UserService.findByEmail(email);
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

  async validateGoogleUser(profile: any) {
    const email = this.normalizeEmail((profile.emails as any[])[0].value);
    let user = await this.UserService.findByEmail(email);

    if (!user) {
      user = await this.UserService.create({
        email,
        name: (profile.displayName as string) || "User",
        password: await this.hashPassword(Math.random().toString(36)),
        verified: true,
      });
    }

    const payload: JwtPayload = {
      sub: String(user.id),
      name: user.name,
      email: user.email,
      role: user.role,
      verified: user.verified,
    };
    const token = this.signToken(payload, "1d");

    return {
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: String(user.role),
        verified: user.verified,
      },
    };
  }
  generateTokenForGoogleUser(user: {
    id: number;
    name: string;
    email: string;
    role: Role;
  }) {
    const payload: JwtPayload = {
      sub: String(user.id),
      name: user.name,
      email: user.email,
      role: user.role,
      verified: true,
    };
    const token = this.signToken(payload, "1d");
    return token;
  }
  async validateToken(token: string) {
    try {
      const decoded = this.jwtService.verify<JwtPayload>(token);
      const user = await this.UserService.findByEmail(decoded.email);
      if (!user) {
        throw new BadRequestException("User not found");
      }
      return {
        statusCode: 200,
        message: "Token is valid",
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          phone: user.phone,
          role: String(user.role),
          verified: user.verified,
        },
      };
    } catch (error) {
      console.error("Error validating token:", error);
      throw new ForbiddenException("Invalid or expired token");
    }
  }

  verifyJwtToken(token: string): boolean {
    try {
      this.jwtService.verify<JwtPayload>(token);
      return true;
    } catch (error) {
      console.error("Error verifying JWT token:", error);
      return false;
    }
  }
}

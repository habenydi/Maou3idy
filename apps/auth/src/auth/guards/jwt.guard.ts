import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { Role } from "@prisma/client";
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";

export interface JwtPayload {
  sub: string;
  role: Role;
  name: string;
  email: string;
  verified: boolean;
}

interface RequestWithUser extends Request {
  user: JwtPayload;
}

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<RequestWithUser>();
    const token = request.cookies?.access_token;

    if (request.cookies) {
      console.log(request.cookies);
      // throw new UnauthorizedException("Unauthorized!");
    }
    if (!token) {
      throw new UnauthorizedException("Unauthorized! sdfnur askdn");
    }

    try {
      const payload = await this.jwtService.verifyAsync<JwtPayload>(token);
      if (!payload?.sub || !payload?.email) {
        throw new UnauthorizedException("Invalid token payload");
      }

      request.user = payload;

      return true;
    } catch {
      throw new UnauthorizedException("Invalid or expired token");
    }
  }
}

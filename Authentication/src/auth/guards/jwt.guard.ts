import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { Role } from "@prisma/client";

interface JwtPayload {
  sub: string;
  email: string;
  role: Role;
}

interface RequestWithUser extends Request {
  user: JwtPayload;
}

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(private JwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<RequestWithUser>();
    const authHeader = request.headers.authorization;
    if (!authHeader) {
      throw new UnauthorizedException("Unauthorized!");
    }
    const [type, token] = authHeader.split(" ");
    if (type !== "Bearer" || !token) {
      throw new UnauthorizedException("Invalid token format");
    }
    try {
      const payload = await this.JwtService.verifyAsync<JwtPayload>(token);
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

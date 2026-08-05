import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { IS_PUBLIC_KEY } from "src/auth/decorator/public.decorator";
import { Reflector } from "@nestjs/core";

export interface JwtPayload {
  sub: string;
  name: string;
  email: string;
}

interface RequestWithUser extends Request {
  user: JwtPayload;
}

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private prisma: PrismaService,
    private reflector: Reflector,
  ) {}

  private extractTokenFromRequest(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(" ") ?? [];
    if (type === "Bearer" && token) {
      return token;
    }
    return request.cookies?.access_token;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest<RequestWithUser>();
    const token = this.extractTokenFromRequest(request);

    if (!token) {
      throw new UnauthorizedException("Authentication token missing");
    }

    // Inside jwt.guard.ts
    try {
      const payload = await this.jwtService.verifyAsync<JwtPayload>(token);

      let user = await this.prisma.user.findUnique({
        where: { id: payload.sub },
      });

      if (!user) {
        user = await this.prisma.user.create({
          data: {
            id: payload.sub,
            email: payload.email,
            name: payload.name || "User",
          },
        });
        console.log(
          `Auto-created user ${payload.sub} locally from JWT payload.`,
        );
      }

      request.user = {
        sub: user.id,
        name: user.name,
        email: user.email,
      };

      return true;
    } catch (error) {
      throw new UnauthorizedException("Unauthorized or invalid token");
    }
  }
}

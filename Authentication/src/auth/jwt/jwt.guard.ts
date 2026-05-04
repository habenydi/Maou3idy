import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtGuard implements CanActivate {
  constructor (private JwtService: JwtService) {}
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean>{
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;
    if (!authHeader) {
      throw new UnauthorizedException("Unauthorized!");
    }
    const [type, token] = authHeader.split(' ');
    if (type != "Bearer" || !token)
    {
      throw new UnauthorizedException("Invalid token format");
    }
    try {
      const playload = await this.JwtService.verifyAsync(token);
      request.user = playload;
      return true;
    }
    catch {
      throw new UnauthorizedException("Invalid or expired token");
    }
  }
}

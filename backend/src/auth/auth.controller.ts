import { Controller, Post, Query,Headers, Get, UseGuards, Req, Param } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { JwtGuard } from './jwt/jwt.guard';

@Controller('auth')
export class AuthController {
    constructor (private Authservice: AuthService) {}
    @Post('register')
    register(@Query() Query: RegisterDto) {
        return this.Authservice.register(Query);
    }
    @Post('login')
    login(@Query() Query: LoginDto) {
        return this.Authservice.login(Query);
    }
    @UseGuards(JwtGuard)
    @Get('me')
    getMe(@Req() req) {
        return req.user;
    }
}

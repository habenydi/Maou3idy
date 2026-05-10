import { Controller, Post, Query,Headers, Get, UseGuards, Req, Param } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { JwtGuard } from './jwt/jwt.guard';
import { ForgetPasswordDto } from './dto/forget_password.dto';

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
    @Post('forget')
    forget(@Query() Query: ForgetPasswordDto) {
        return this.Authservice.forget_password(Query);
    }
    @Get('verify_email/token=:token')
    verify_email(@Param('token') token: string) {
        return this.Authservice.verify_email(token);
    }
    @Get('reset_password/:token')
    reset_password(@Param('token') token: string, @Query('new_password') new_password: string) {
        return this.Authservice.reset_password(token, new_password);
    }
    @Post('change_password/:id') 
    change_password(@Param('id') id: number, @Query('new_password') new_password: string, @Query('old_password') old_password: string) {
        return this.Authservice.change_password(id, new_password, old_password);
    }
    @UseGuards(JwtGuard)
    @Get('me')
    getMe(@Req() req: any) {
        return req.user;
    }
}

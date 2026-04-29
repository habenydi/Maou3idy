import { Controller, Post, Query,Headers } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

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
    @Post('logout')
    logout(@Headers('authorization') autheader: string) {
        return this.Authservice.logout(autheader);
    }
}

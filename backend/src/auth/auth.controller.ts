import { Controller, Post, Query } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor (private Authservice: AuthService) {}
    @Post('register')
    register(@Query() Query: any) {
        return this.Authservice.register(Query.email, Query.password);
    }
    @Post('login')
    login(@Query() Query: any) {
        return this.Authservice.login(Query.email, Query.password);
    }
    @Post('logout')
    logout(@Query() Query: any) {
        return this.Authservice.logout(Query.email, Query.token);
    }
}

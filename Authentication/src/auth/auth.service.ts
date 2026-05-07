import { BadRequestException, ForbiddenException, Injectable, UnauthorizedException, Unlock } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor (private jwtService: JwtService, private UserService: UsersService) {}
    private table:{email: string, password: string, id: number} [] = [];
    async hashPassword(password: string){
        return await bcrypt.hash(password, 10);
    }
    async compare(password: string, hashed: string) {
        return await bcrypt.compare(password, hashed);
    }
    async register(body: RegisterDto) {
        const hashedPassword = await this.hashPassword(body.password);

        const user = await this.UserService.create({
            ...body,
            password: hashedPassword,
        });

        const payload = {
            sub: user.id,
            email: user.email,
        };
        const token = this.jwtService.sign(payload);
        return {
            access_token: token,
            user,
        };
    }
    async login(Body: LoginDto) {
        const user = await this.UserService.findByEmail(Body.email);
        if (!user) {
            throw new UnauthorizedException("User not found");
        }
        const isMatched = this.compare(Body.password, user.password);
        if (!isMatched) {
            throw new UnauthorizedException("Wrong password");
        }
        const playload = {sub: user.id , email: user.email};
        const token = this.jwtService.sign(playload);
        return {
            Message : 'Login success',
            user,
            access_token: token
        }

    }
    async forget_password(){}
}

import { BadRequestException, ForbiddenException, Injectable, UnauthorizedException, Unlock } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { ForgetPasswordDto } from './dto/forget_password.dto';
import { MailerService } from '@nestjs-modules/mailer';


@Injectable()
export class AuthService {
    constructor (private jwtService: JwtService,
        private UserService: UsersService,
        private readonly email: MailerService) {}
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
        // const url = `http://localhost:3000/auth/verify_email/token=${token}`;
        // await this.email.sendMail({
        //     to: user.email,
        //     subject: 'Verify your email',
        //     text: `Please click the following link to verify your email: ${url}`,
        // });
        return {
            statusCode: 201,
            message: 'User registered successfully',
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
    async forget_password(ForgetPasswordDto: ForgetPasswordDto) {
        const user = await this.UserService.findByEmail(ForgetPasswordDto.email);
        if (!user) {
            throw new BadRequestException("User not found");
        }
        const url = `http://localhost:3000/auth/reset_password/token=${this.jwtService.sign({sub: user.id, email: user.email})}`;
        return { url };
    }
    async reset_password(token: string, new_password: string) {
        try {
            const decoded = this.jwtService.verify(token);
            const user = await this.UserService.findByEmail(decoded.email);
            if (!user) {
                throw new BadRequestException("User not found");
            }
            const hashedPassword = await this.hashPassword(new_password);
            await this.UserService.update(user.id, { password: hashedPassword });
            this.verify_email(token);
            return { message: "Password reset successful" };
        } catch (error) {
            throw new ForbiddenException("Invalid or expired token");
        }
    }
    async verify_email(token: string) {
        try {
            const decoded = this.jwtService.verify(token);
            const user = await this.UserService.findByEmail(decoded.email);
            if (!user) {
                throw new BadRequestException("User not found");
            }
            await this.UserService.update(user.id, { verified: true });
            return { message: "Email verified successfully" };
        } catch (error) {
            throw new ForbiddenException("Invalid or expired token");
        }
    }
    async change_password(userId: number, old_password: string, new_password: string) {
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
        return { message: "Password changed successfully" };
    }
}

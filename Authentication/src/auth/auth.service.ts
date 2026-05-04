import { BadRequestException, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor (private jwtService: JwtService) {}
    private table:{email: string, password: string, id: number} [] = [];
    async hashPassword(password: string){
        return await bcrypt.hash(password, 10);
    }
    async compare(password: string, hashed: string) {
        return await bcrypt.compare(password, hashed);
    }
    async register(Body: RegisterDto) {
        const existe = this.table.find(u => u.email === Body.email); 
        if (existe) {
            throw new BadRequestException("email already exist");
        }
        const playload = {sub: this.table.length + 1, email: Body.email};
        const token = this.jwtService.sign(playload);
        const newUser = {
            email: Body.email,
            password: await this.hashPassword(Body.password),
            id : this.table.length + 1,
            token: token
        };
        this.table.push(newUser);
        return {
            id: newUser.id,
            email: newUser.email,
            token: newUser.token,
        };
    }
    async login(Body: LoginDto) {
        const existe = this.table.find(u => u.email === Body.email);
        if (!existe) {
            throw new BadRequestException("the email does not existe");
        }
        if (!(await this.compare(Body.password, existe.password))) {
            throw new BadRequestException("Wrong Password!");
        }
        const playload = {sub: this.table.length + 1, email: Body.email};
        const token = this.jwtService.sign(playload);
        return {
            id: existe.id,
            email: Body.email,
            token: token
        };
    }
    async forget_password(){}
}

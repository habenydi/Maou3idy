import { BadRequestException, Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    private table:{email: string, password: string, token: string, id: number} [] = [];
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
        const newUser = {
            email: Body.email,
            password: await this.hashPassword(Body.password),
            id : this.table.length + 1,
            token: "Fake_token" + (this.table.length + 1)
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
        existe.token = "Fake_token" + existe.id;
        return {
            id: existe.id,
            email: Body.email,
            token: existe.token
        };
    }
    async logout(token: string) {
        const existe = this.table.find(u => u.token === token);
        if (!existe) {
            throw new BadRequestException("your are not logged in!");
        }
        existe.token = "";
        return {
            email: existe.email,
            message: "you are now logged out"
        };
    }
}

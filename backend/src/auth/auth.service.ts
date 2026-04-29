import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
    private table:{email: string, password: string, token: string, id: number} [] = [];
    async register(email: string, password: string) {
        const existe = this.table.find(u => u.email === email); 
        if (existe) {
            throw new BadRequestException("email already exist");
        }
        const newUser = {
            email,
            password,
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
    async login(email: string, password: string) {
        const existe = this.table.find(u => u.email === email); 
        if (!existe) {
            throw new BadRequestException("the email does not existe");
        }
        if (this.table[email].password != password){
            throw new BadRequestException("Wrong Password!");
        }
        this.table[email].token = "Fake_token" + this.table[email].id;
        return {
            id: this.table[email].id,
            email: email,
            token: this.table[email].token
        };
    }
    async logout(email: string, token: string){
        const existe = this.table.find(u => u.email === email); 
        if (!existe) {
            throw new BadRequestException("the email does not existe");
        }
        if (this.table[email].token != token || token == ""){
            throw new BadRequestException("You need to be login first");
        }
        this.table[email].token = "";
        return {
            email: email,
            message: "you are now logged out"
        };
    }
}

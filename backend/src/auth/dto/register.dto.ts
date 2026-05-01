import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class RegisterDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;
    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    password: string;
    @IsNotEmpty()
    name : string;
    @IsNotEmpty()
    phone: string;
    role: string;
}
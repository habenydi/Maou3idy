import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
export class UpdateUserDto {
  @IsEmail()
  email?: string;

  @IsNotEmpty()
  @IsString()
  name?: string;

  @IsNotEmpty()
  @IsString()
  phone?: string;
}

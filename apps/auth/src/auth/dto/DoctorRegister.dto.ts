import { IsEmail, IsNotEmpty, Matches, MinLength } from "class-validator";

export class DoctorRegisterDto {
  @IsNotEmpty({ message: "Full name is required" })
  name: string;
  @IsEmail({}, { message: "Invalid email format" })
  @IsNotEmpty({ message: "Email is required" })
  email: string;
  @IsNotEmpty({ message: "Password is required" })
  @MinLength(8, { message: "Password must be at least 8 characters long" })
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
    {
      message:
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
    },
  )
  password: string;
  location: string;
  experience: number;
  @IsNotEmpty({ message: "speciality is required" })
  speciality: string;
  @IsNotEmpty({ message: "License number is required" })
  license_number: string;
  @IsNotEmpty({ message: "Years of experience is required" })
  years_of_experience: number;
  @IsNotEmpty({ message: "Brief bio is required" })
  bio: string;
  @IsNotEmpty({ message: "Phone number is required" })
  phone: string;
  @IsNotEmpty({ message: "Medical license is required" })
  medical_license: string;
}

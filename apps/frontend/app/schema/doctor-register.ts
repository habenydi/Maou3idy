import { z } from "zod";

export const registerDoctorSchema = z.object({
  name: z.string().min(1, "Full name is required"),

  email: z
    .string()
    .email("Enter a valid email address")
    .refine(
      (value) => value.includes("@"),
      "Please enter a valid email address. It should contain '@'."
    )
    .refine(
      (value) => /\.(com|ma)$/i.test(value),
      "Email must end with .com or .ma"
    ),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    ),

  speciality: z.string().min(1, "Specialty is required"),

  license_number: z.string().min(
    1,
    "License number is required"
  ),

  years_of_experience: z.number().min(0),

  bio: z.string().min(
    1,
    "Brief bio is required"
  ),

  phone: z.string().min(
    1,
    "Phone number is required"
  ),
});
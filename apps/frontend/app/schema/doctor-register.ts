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

  speciality: z.string().min(1, "Specialty is required"),

  license_number: z.string().min(1, "License number is required"),

  years_of_experience: z.number().min(0),

  bio: z.string().min(1, "Brief bio is required"),

  phone: z.string().min(1, "Phone number is required"),

  location: z.string().min(1, "Location is required"),

  languages: z.array(z.string()).min(1, "Languages are required"),
});
import { z } from "zod";
import { registerSchema } from "../app/schema/register";

export type RegisterFormData = z.infer<typeof registerSchema>;
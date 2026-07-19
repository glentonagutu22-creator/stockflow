import { z } from "zod";

export const registerSchema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters"),

  email: z
    .email("Please enter a valid email address"),

  phone: z
    .string()
    .min(10, "Phone number is too short")
    .max(15, "Phone number is too long"),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters"),
});
export const loginSchema = z.object({
  email: z.email("Please enter a valid email address"),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters"),
});
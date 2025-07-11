import {z} from "zod";

export const emailSchema = z.email({message: "Invalid email format"});

export const passwordSchema = z
  .string()
  .min(1, {message: "Password is required"})
  .min(8, {message: "Password must be at least 8 characters"})
  .max(30, {message: "Password cannot exceed 30 characters"})
  .regex(/[A-Z]/, {message: "Must contain at least one uppercase letter"})
  .regex(/[a-z]/, {message: "Must contain at least one lowercase letter"})
  .regex(/[0-9]/, {message: "Must contain at least one number"})
  .regex(/[!@#$%^&*()\-_=+{}[\]|:;'"<>,.?/~`]/, {
    message: "Must contain at least one special character",
  })
  .refine((password) => !/\s/.test(password), {
    message: "Password cannot contain spaces",
  });

import * as z from "zod";

export const RegisterSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  userName: z.string().min(3, {
    message: "Username must be at least 3 characters long.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters long.",
  }),
  confirmPassword: z.string().min(6, {
    message: "Password must be at least 6 characters long.",
  }),
});

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters long.",
  }),
});

export const RecipeSchema = z.object({
  title: z.string().min(2, { message: "The title is not long enough" }),
  description: z
    .string()
    .min(5, { message: "The description is not long enough" }),
  ingredients: z.array(z.string()),
  instructions: z.array(z.string()),
});

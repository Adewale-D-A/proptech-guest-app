/** @format */

import { string, z } from "zod";
import { isValidPhoneNumber } from "react-phone-number-input";

const firstName = z.string().min(1, "First name is required");
const lastName = z.string().min(1, "Last name is required");
const email = z
  .string()
  .email("Email must be a valid email address")
  .min(1, "Email is required");
const password = z
  .string()
  .min(1, "Password field is required")
  .min(7, "Password must be at least 7 characters long");


export const signInValidationSchema = z.object({ email, password });
export const signUpValidationSchema = z
  .object({
    firstName,
    lastName,
    email,
    password,
    confirmPassword: string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirm"],
  });
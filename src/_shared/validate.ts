/** @format */

import { string, z } from "zod";
import { isValidPhoneNumber } from "react-phone-number-input";

const first_name = z.string().min(1, "First name is required");
const last_name = z.string().min(1, "Last name is required");
const gender = z.string().min(1, "Gender is required");
const email = z
  .string()
  .email("Email must be a valid email address")
  .min(1, "Email is required");
const escalation_reason = z.string().min(1, "Escalation message is required");

const password = z
  .string()
  .min(1, "Password field is required")
  .min(7, "Password must be at least 7 characters long");

export const signInValidationSchema = z.object({
  email,
  password,
  rememberMe: z.boolean(),
});
export const escalataSchema = z.object({
  escalation_reason,
});
export const signUpValidationSchema = z
  .object({
    first_name,
    last_name,
    email,
    password,
    password_confirmation: string(),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Passwords don't match",
    path: ["password_confirmation"],
  });

export const updateProfileSchema = z.object({
  first_name,
  last_name,
  email,
  gender,
});

export const nameSchema = z.object({
  name: z.string().min(1, "Name is required"),
});

export const bookingSchema = z.object({
  check_in_day: z.string().nonempty("Check-in date is required"),
  check_in_time: z.string().nonempty("Check-in time is required"),
  check_out_day: z.string().nonempty("Check-out date is required"),
  check_out_time: z.string().nonempty("Check-out time is required"),
  number_of_guests: z.string().nonempty("Number of guests is required"),
});
export const bookingUpdateSchema = z.object({
  check_in_day: z.string().nonempty("Check-in date is required"),
  check_in_time: z.string().nonempty("Check-in time is required"),
  // check_out_day: z.string().nonempty("Check-out date is required"),
  // check_out_time: z.string().nonempty("Check-out time is required"),
});

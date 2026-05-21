import { z } from "zod";

export const passwordSchema = z
  .object({
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .regex(/[A-Z]/, "Password must include at least one uppercase letter")
      .regex(/[0-9]/, "Password must include at least one number")
      .regex(
        /[^A-Za-z0-9]/,
        "Password must include at least one special character",
      ),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const signInSchema = z.object({
  email: z.email("Please enter your email address"),
  password: z.string().min(1, "Please enter your password"),
  rememberMe: z.boolean().default(false),
});
export type SignInSchema = z.infer<typeof signInSchema>;

export const signUpSchema = z
  .object({
    firstName: z.string().min(1, "First name required"),
    lastName: z.string().min(1, "Last name required"),
    email: z.email("Invalid email address"),
    phone: z.string().min(8, "Phone number required"),
    agree: z.boolean().refine((val) => val === true, {
      message: "You must agree to continue",
    }),
  })
  .and(passwordSchema);
export type SignUpSchema = z.infer<typeof signUpSchema>;

export const resetPasswordSchema = z.object({
  email: z.email("Please enter your email address"),
});
export type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>;

export const newPasswordSchema = passwordSchema;
export type NewPasswordSchema = z.infer<typeof newPasswordSchema>;

export const updateUserProfileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").optional(),
  image: z.url("Invalid image URL").optional().or(z.literal("")),
  phoneNumber: z
    .string()
    .min(10, "Phone number must be at least 10 characters")
    .optional()
    .or(z.literal("")),
});

export type UpdateUserProfileSchema = z.infer<typeof updateUserProfileSchema>;

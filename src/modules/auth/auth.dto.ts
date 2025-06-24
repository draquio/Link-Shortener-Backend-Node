import { z } from "zod";

export interface TokenResponse {
    accessToken: string;
    refreshToken: string;
}

export const TokenSchema = z.object({
  token: z.string().min(1, "Token is required"),
})
export const RefreshTokenSchema = z.object({
  refreshToken: z.string().min(1, "Refresh Token is required"),
})

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(3),
});

export const RegisterSchema = z.object({
  email: z.string().email(),
  username: z.string().min(3).max(30),
  password: z.string().min(3),
  repeatPassword: z.string().min(3)
}).refine((data) => data.password === data.repeatPassword, {
  path: ["repeatPassword"],
  message: "Passwords do not match",
})

export const ForgotPasswordSchema = z.object({
  email: z.string().email(),
});

export const ResetPasswordSchema = z.object({
  password: z.string().min(3),
  repeatPassword: z.string().min(3)
}).refine((data) => data.password === data.repeatPassword, {
  path: ["repeatPassword"],
  message: "Passwords do not match",
})



export type LoginDTO = z.infer<typeof LoginSchema>;
export type RegisterDTO = z.infer<typeof RegisterSchema>;
export type TokenDTO = z.infer<typeof TokenSchema>;
export type RefreshTokenDTO = z.infer<typeof RefreshTokenSchema>;
export type ForgotPasswordDTO = z.infer<typeof ForgotPasswordSchema>;
export type ResetPasswordDTO = z.infer<typeof ResetPasswordSchema>;
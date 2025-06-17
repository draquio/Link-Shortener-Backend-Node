import { z } from "zod";

export interface TokenResponse {
    accessToken: string;
    refreshToken: string;
}


export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export type LoginDTO = z.infer<typeof LoginSchema>;
import { z } from "zod";

export interface UserResponseDTO {
  id: number;
  email: string;
  username: string;
  isActive: boolean;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  membershipId?: number;
}




export const UserCreateSchema = z.object({
  email: z.string().email(),
  username: z.string().min(3).max(30),
  password: z.string().min(3),
  membershipId: z.number().optional(),
  isActive: z.boolean().optional(),
});

export const UserUpdateSchema = z.object({
  username: z.string().min(3).max(30).optional(),
  email: z.string().email().optional(),
  isActive: z.boolean().optional(),
  membershipId: z.number().optional(),
})

export const UserSetNewPasswordSchema = z.object({
  password: z.string().min(3),
  repeatPassword: z.string().min(3)
}).refine((data) => data.password === data.repeatPassword, {
  path: ["repeatPassword"],
  message: "Passwords do not match",
})


export type UserCreateDTO = z.infer<typeof UserCreateSchema>;
export type UserUpdateDTO = z.infer<typeof UserUpdateSchema>;
export type UserSetNewPasswordDTO = z.infer<typeof UserSetNewPasswordSchema>;
import { Link, User } from "@prisma/client";
import { z } from "zod";

export interface LinkResponseDTO {
  id: number;
  userId: number;
  originalUrl: string;
  advertisementLink?: string;
  shortCode: string;
  createdAt: string;
  expirationDate?: string;
  isActive: boolean;
}

export type LinkUpdatableFields = Pick<Link, "advertisementLink" | "expirationDate" | "isActive">;

export const LinkCreateSchema = z.object({
  originalUrl: z.string().url(),
  advertisementLink: z.string().url().optional(),
  expirationDate: z.coerce.date().optional(),
});

export const LinkUpdateSchema = z.object({
  advertisementLink: z.string().url().optional(),
  expirationDate: z.union([z.string().datetime(), z.coerce.date()]).optional(),
  isActive: z.boolean().optional(),
});

export type LinkCreateDTO = z.infer<typeof LinkCreateSchema>;
export type LinkUpdateDTO = z.infer<typeof LinkUpdateSchema>;


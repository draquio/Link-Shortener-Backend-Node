import { z } from "zod";

export interface VisitResponseDTO {
  id: number;
  linkId: number;
  visitDate: string;
  ip?: string;
  userAgent?: string;
  referrer?: string;
  country?: string;
}

export const VisitRegisterSchema = z.object({
  ip: z.string().optional(),
  userAgent: z.string().optional(),
  referrer: z.string().optional(),
  country: z.string().optional(),
});

export type VisitRegisterDTO = z.infer<typeof VisitRegisterSchema>;
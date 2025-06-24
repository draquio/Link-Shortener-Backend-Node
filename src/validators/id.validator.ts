import { z } from "zod";

export const IdValidator = z
  .string()
  .regex(/^\d+$/, { message: "ID must be a numeric string" })
  .transform(Number)
  .refine(val => val > 0, {
    message: "ID must be a positive integer",
  });
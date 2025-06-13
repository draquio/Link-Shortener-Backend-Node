import { z } from "zod";

export const IdValidator = z.object({
  id: z.string().regex(/^\d+$/).transform(Number).refine(val => val > 0, {
    message: "ID must be a positive integer"
  })
});
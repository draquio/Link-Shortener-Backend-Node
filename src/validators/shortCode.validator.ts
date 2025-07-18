import { z } from "zod";

export const ShortCodeValidator = z
  .string()
  .min(4, { message: "Shortcode must be at least 4 characters long" })
  .max(64, { message: "Shortcode must be at most 64 characters long" }) // puedes ajustar
  .regex(/^[a-zA-Z0-9]+$/, {
    message: "Shortcode must contain only letters and numbers",
  });

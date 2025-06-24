import { z } from "zod";

export const TokenValidator = z
  .string()
  .min(10, { message: "Token must be at least 10 characters" })
  .max(512, { message: "Token must be at most 512 characters" }); 

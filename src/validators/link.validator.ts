import { z } from "zod";
import { PaginationValidator } from "./pagination.validator";

export const LinkQueryValidator = PaginationValidator.extend({
  isActive: z
    .union([
      z.literal("true").transform(() => true),
      z.literal("false").transform(() => false),
      z.undefined(),
    ])
    .optional(),
});

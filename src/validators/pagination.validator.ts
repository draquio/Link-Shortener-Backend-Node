import { z } from "zod";

const DEFAULT_PAGE = 1;
const DEFAULT_PAGE_SIZE = 10;
const MAX_PAGE_SIZE = 20;

export const PaginationValidator = z.object({
  page: z.preprocess(
    val => parseInt(val as string),
    z.number().int().transform(val => (val >= 1 ? val : DEFAULT_PAGE))
  ).default(DEFAULT_PAGE),

  pageSize: z.preprocess(
    val => parseInt(val as string),
    z.number().int().transform(val => {
      if (val < 1) return DEFAULT_PAGE_SIZE;
      if (val > MAX_PAGE_SIZE) return MAX_PAGE_SIZE;
      return val;
    })
  ).default(DEFAULT_PAGE_SIZE),
});

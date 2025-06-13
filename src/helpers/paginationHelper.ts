import { Request } from "express";

const DEFAULT_PAGE = 1;
const DEFAULT_PAGE_SIZE = 10;
const MAX_PAGE_SIZE = 20;

export const parsePaginationParams = (req: Request) => {
    let page = parseInt(req.query.page as string) || DEFAULT_PAGE;
    let pageSize = parseInt(req.query.page as string) || DEFAULT_PAGE_SIZE;
    page = Math.max(1, page);
    pageSize = Math.min(Math.max(1, pageSize), MAX_PAGE_SIZE);
    return { page, pageSize };
}
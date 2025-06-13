import { Pagination } from "@/types/Responses";
import userService from "./user.service";
import { Request, Response } from "express";
import { ResponseHelper } from "@/helpers/responseHelper";
import { parsePaginationParams } from "@/helpers/paginationHelper";
import { validateId } from "@/validators/validateId";

class UserController {
  async getAll(req: Request, res: Response) {
    const { page, pageSize } = parsePaginationParams(req);
    const isDeleted = req.query.isDeleted === "true";

    const {data, total} = await userService.getAll(page, pageSize, isDeleted);
    const totalPages = Math.ceil(total / pageSize);
    const pagination: Pagination = { page, pageSize, totalResults: total, totalPages };
    const response = ResponseHelper.success(data, "Users retrieved successfully", pagination)
    res.json(response);
  }
  async getById(req: Request, res: Response) {
    const id = validateId(req.query.id as string);
    console.log(id);
    
    const user = await userService.getById(id);
    const response = ResponseHelper.success(user, "User retrieved successfully")
    res.json(response);
  }

  async create(req: Request, res: Response) {
    const user = await userService.create(req.body);
    const response = ResponseHelper.success(user, "User created successfully")
    res.status(201).json(response);
  }

  async update(req: Request, res: Response) {
    const id = validateId(req.query.id as string);
    const data = req.body;
    const user = await userService.update(id, data);
    const response = ResponseHelper.success(user, "User updated successfully");
    res.json(response);
  }
  async delete(req: Request, res: Response) {
    const id = validateId(req.query.id as string);
    await userService.delete(id);
    res.status(204).send();
  }
}

export default new UserController();

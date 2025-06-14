import { Pagination } from "@/types/Responses";
import userService from "./user.service";
import { Request, Response } from "express";
import { ResponseHelper } from "@/helpers/responseHelper";
import { IdValidator } from "@/validators/id.validator";
import { UserCreateSchema, UserSetNewPasswordSchema, UserUpdateSchema } from "./user.dto";
import { PaginationValidator } from "@/validators/pagination.validator";

class UserController {
  async getAll(req: Request, res: Response) {
    const { page, pageSize } = PaginationValidator.parse(req.query);
    const isDeleted = req.query.isDeleted === "true";

    const {data, total} = await userService.getAll(page, pageSize, isDeleted);
    const totalPages = Math.ceil(total / pageSize);
    const pagination: Pagination = { page, pageSize, totalResults: total, totalPages };
    const response = ResponseHelper.success(data, "Users retrieved successfully", pagination)
    res.json(response);
  }
  async getById(req: Request, res: Response) {
    const { id } = IdValidator.parse(req.params);
    const user = await userService.getById(id);
    const response = ResponseHelper.success(user, "User retrieved successfully")
    res.json(response);
  }

  async create(req: Request, res: Response) {
    const userCreateDTO = UserCreateSchema.parse(req.body);
    const user = await userService.create(userCreateDTO);
    const response = ResponseHelper.success(user, "User created successfully")
    res.status(201).json(response);
  }

  async update(req: Request, res: Response) {
    const { id } = IdValidator.parse(req.params);
    const userUpdateDTO = UserUpdateSchema.parse(req.body);
    const user = await userService.update(id, userUpdateDTO);
    const response = ResponseHelper.success(user, "User updated successfully");
    res.json(response);
  }
  async delete(req: Request, res: Response) {
    const { id } = IdValidator.parse(req.params);
    await userService.delete(id);
    res.status(204).send();
  }

  async setNewPassword(req: Request, res: Response) {
    const { id } = IdValidator.parse(req.params);
    const { password } = UserSetNewPasswordSchema.parse(req.body);
    console.log(id, password);
    
    const user = await userService.setNewPassword(id, password);
    const response = ResponseHelper.success(user, "Password updated successfully"); 
    res.json(response);
  }
}

export default new UserController();

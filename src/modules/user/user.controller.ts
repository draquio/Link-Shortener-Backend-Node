import { Pagination } from "@/types/Responses";
import { Request, Response } from "express";
import { ResponseHelper } from "@/helpers/responseHelper";
import { IdValidator } from "@/validators/id.validator";
import { UserCreateDTO, UserSetNewPasswordDTO, UserUpdateDTO } from "./user.dto";
import { PaginationValidator } from "@/validators/pagination.validator";
import { UserService } from "./user.service";


export class UserController {
  constructor(private readonly userService:UserService){}

  
  async getAll(req: Request, res: Response) {
    const { page, pageSize } = PaginationValidator.parse(req.query);
    const isDeleted = req.query.isDeleted === "true";

    const {users, total} = await this.userService.getAll(page, pageSize, isDeleted);
    const totalPages = Math.ceil(total / pageSize);
    const pagination: Pagination = { page, pageSize, totalResults: total, totalPages };
    const response = ResponseHelper.success(users, "Users retrieved successfully", pagination)
    res.status(200).json(response);
  }

  async getById(req: Request, res: Response) {
    const id = IdValidator.parse(req.params.id);
    const user = await this.userService.getById(id);
    const response = ResponseHelper.success(user, "User retrieved successfully")
    res.status(200).json(response);
  }

  async create(req: Request, res: Response) {
    const userCreateDTO = req.body satisfies UserCreateDTO;
    const user = await this.userService.create(userCreateDTO);
    const response = ResponseHelper.success(user, "User created successfully")
    res.status(201).json(response);
  }

  async update(req: Request, res: Response) {
    const id = IdValidator.parse(req.params.id);
    const userUpdateDTO = req.body satisfies UserUpdateDTO;
    const user = await this.userService.update(id, userUpdateDTO);
    const response = ResponseHelper.success(user, "User updated successfully");
    res.status(200).json(response);
  }
  async delete(req: Request, res: Response) {
    const id = IdValidator.parse(req.params.id);
    await this.userService.delete(id);
    res.status(204).send();
  }

  async setNewPassword(req: Request, res: Response) {
    const id = IdValidator.parse(req.params.id);
    const { password } = req.body satisfies UserSetNewPasswordDTO;
    const user = await this.userService.setNewPassword(id, password);
    const response = ResponseHelper.success(user, "Password updated successfully"); 
    res.status(200).json(response);
  }
}

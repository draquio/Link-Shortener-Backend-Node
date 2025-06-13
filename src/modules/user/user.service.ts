import { User } from "@prisma/client";
import { CreateUserDTO, UpdateUserDTO, UserResponseDTO } from "./user.dto";
import { DtoCreateToUser, UserListToDTOs, UserToDTO } from "./user.mapper";
import userRespository from "./user.respository";
import { hashPassword } from "@/utils/hash";
import { NotFoundError } from "@/errors/NotFoundError";

class UserService {
  async getAll(page: number, pageSize: number, isDeleted: boolean) {
    const data = await userRespository.getAll(page, pageSize, isDeleted);
    return {data: UserListToDTOs(data.users), total: data.total}
  }

  async getById(id: number) {
    const user = await userRespository.getByid(id);
    if (!user) throw new NotFoundError("User", id);
    return UserToDTO(user);
  }

  async create(data: CreateUserDTO) {
    const hashedPassword = await hashPassword(data.password);
    data.password = hashedPassword;
    data.isActive = true;
    const userCreated = await userRespository.create(data);
    return UserToDTO(userCreated);
  }

  async update(id: number, data: UpdateUserDTO) {
    const user = await userRespository.getByid(id);
    if (!user) throw new Error("User not found");
    const userUpdated = await userRespository.update(id, data);
    return UserToDTO(userUpdated);
  }

  async delete(id: number) {
    const user = await userRespository.getByid(id);
    if (!user) throw new Error("User not found");
    await userRespository.softDelete(id);
  }
}

export default new UserService();

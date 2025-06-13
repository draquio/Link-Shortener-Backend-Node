import { UserCreateDTO, UserUpdateDTO } from "./user.dto";
import userRespository from "./user.respository";
import { hashPassword } from "@/utils/hash";
import { NotFoundError } from "@/errors/NotFoundError";
import { UserMapper } from "./user.mapper";

class UserService {
  async getAll(page: number, pageSize: number, isDeleted: boolean) {
    const data = await userRespository.getAll(page, pageSize, isDeleted);
    return {data: UserMapper.toDTOList(data.users), total: data.total}
  }

  async getById(id: number) {
    const user = await userRespository.getByid(id);
    if (!user) throw new NotFoundError("User", id);
    return UserMapper.toDTO(user);
  }

  async create(data: UserCreateDTO) {
    const hashedPassword = await hashPassword(data.password);
    data.password = hashedPassword;
    data.isActive = true;
    const userEntity = UserMapper.toEntityFromCreate(data);
    const userCreated = await userRespository.create(userEntity);
    return UserMapper.toDTO(userCreated);
  }

  async update(id: number, data: UserUpdateDTO) {
    const userExist = await userRespository.getByid(id);
    if (!userExist) throw new NotFoundError("User", id);
    const userEntity = UserMapper.toEntityFromUpdate(data)
    const userUpdated = await userRespository.update(id, userEntity);
    return UserMapper.toDTO(userUpdated);
  }

  async delete(id: number) {
    const user = await userRespository.getByid(id);
    if (!user) throw new NotFoundError("User", id);
    await userRespository.softDelete(id);
  }

  async setNewPassword(id:number, password:string){
    const user = await userRespository.getByid(id);
    if (!user) throw new NotFoundError("User", id);
    const hashedPassword = await hashPassword(password);
    await userRespository.update(id, { password:hashedPassword });
  }
}

export default new UserService();

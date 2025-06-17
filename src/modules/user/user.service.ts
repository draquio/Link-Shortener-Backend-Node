import { UserCreateDTO, UserUpdateDTO } from "./user.dto";
import { hashPassword } from "@/utils/hash";
import { NotFoundError } from "@/errors/NotFoundError";
import { UserMapper } from "./user.mapper";
import { UserRepository } from "./user.respository";

export class UserService {
  constructor(private readonly userRepository:UserRepository){}

  async getAll(page: number, pageSize: number, isDeleted: boolean) {
    const data = await this.userRepository.getAll(page, pageSize, isDeleted);
    return {data: UserMapper.toDTOList(data.users), total: data.total}
  }

  async getById(id: number) {
    const user = await this.userRepository.getById(id);
    if (!user) throw new NotFoundError("User", id);
    return UserMapper.toDTO(user);
  }

  async create(data: UserCreateDTO) {
    const hashedPassword = await hashPassword(data.password);
    data.password = hashedPassword;
    data.isActive = true;
    const userEntity = UserMapper.toEntityFromCreate(data);
    const userCreated = await this.userRepository.create(userEntity);
    return UserMapper.toDTO(userCreated);
  }

  async update(id: number, data: UserUpdateDTO) {
    const userExist = await this.userRepository.getById(id);
    if (!userExist) throw new NotFoundError("User", id);
    const userEntity = UserMapper.toEntityFromUpdate(data)
    const userUpdated = await this.userRepository.update(id, userEntity);
    return UserMapper.toDTO(userUpdated);
  }

  async delete(id: number) {
    const user = await this.userRepository.getById(id);
    if (!user) throw new NotFoundError("User", id);
    await this.userRepository.softDelete(id);
  }

  async setNewPassword(id:number, password:string){
    const user = await this.userRepository.getById(id);
    if (!user) throw new NotFoundError("User", id);
    const hashedPassword = await hashPassword(password);
    await this.userRepository.update(id, { password:hashedPassword });
  }
}
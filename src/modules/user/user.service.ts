import { UserCreateDTO, UserResponseDTO, UserUpdateDTO } from "./user.dto";
import { hashPassword } from "@/utils/hash";
import { NotFoundError } from "@/errors/NotFoundError";
import { UserMapper } from "./user.mapper";
import { UserRepository } from "./user.respository";


type GetUsersAndTotal = { users: UserResponseDTO[]; total: number };

export class UserService {
  constructor(private readonly userRepository:UserRepository){}

  async getAll(page: number, pageSize: number, isDeleted: boolean): Promise<GetUsersAndTotal> {
    const data = await this.userRepository.getAll(page, pageSize, isDeleted);
    return {users: UserMapper.toDTOList(data.users), total: data.total}
  }

  async getById(id: number): Promise<UserResponseDTO> {
    const user = await this.userRepository.getById(id);
    if (!user) throw new NotFoundError("User", id);
    return UserMapper.toDTO(user);
  }

  async create(data: UserCreateDTO): Promise<UserResponseDTO> {
    const hashedPassword = await hashPassword(data.password);
    const userEntity = UserMapper.toEntityFromCreate({...data, password: hashedPassword, isActive: true});
    const userCreated = await this.userRepository.create(userEntity);
    return UserMapper.toDTO(userCreated);
  }

  async update(id: number, data: UserUpdateDTO): Promise<UserResponseDTO> {
    const userExist = await this.userRepository.getById(id);
    if (!userExist) throw new NotFoundError("User", id);
    const userEntity = UserMapper.toEntityFromUpdate(data)
    const userUpdated = await this.userRepository.update(id, userEntity);
    return UserMapper.toDTO(userUpdated);
  }

  async delete(id: number): Promise<void> {
    const user = await this.userRepository.getById(id);
    if (!user) throw new NotFoundError("User", id);
    await this.userRepository.softDelete(id);
  }

  async setNewPassword(id:number, password:string): Promise<void> {
    const user = await this.userRepository.getById(id);
    if (!user) throw new NotFoundError("User", id);
    const hashedPassword = await hashPassword(password);
    await this.userRepository.updatePassword(id, hashedPassword);
  }
}
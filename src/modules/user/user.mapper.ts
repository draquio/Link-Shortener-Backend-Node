import { Prisma, User } from "@prisma/client";
import { RegisterDTO } from "../auth/auth.dto";
import { UserCreateDTO, UserResponseDTO, UserUpdatableFields, UserUpdateDTO } from "./user.dto";
import { UserEntity } from "./user.entity";

export class UserMapper {
  static toEntityFromPrisma(user: User): UserEntity {
    return new UserEntity(
      user.email,
      user.password,
      user.username,
      user.isActive,
      user.isDeleted,
      user.membershipId,
      user.id,
      user.createdAt,
      user.updatedAt
    );
  }

  static toEntityFromPrismaList(users: User[]): UserEntity[] {
    return users.map(this.toEntityFromPrisma);
  }

  static toDTOFromEntity(user: UserEntity): UserResponseDTO {
    return {
      id: user.id!,
      email: user.email,
      username: user.username,
      isActive: user.isActive,
      isDeleted: user.isDeleted,
      createdAt: user.createdAt?.toISOString() ?? new Date().toISOString(),
      updatedAt: user.updatedAt?.toISOString() ?? new Date().toISOString(),
    };
  }
  static toDTOFromEntityList(users: UserEntity[]): UserResponseDTO[] {
    return users.map(this.toDTOFromEntity);
  }

  static toEntityFromDTOCreate(dto: UserCreateDTO): UserEntity {
    return new UserEntity(
      dto.email,
      dto.password,
      dto.username,
      dto.isActive ?? false,
      false,
      dto.membershipId
    );
  }
  static toEntityFromDTOUpdate(dto: UserUpdateDTO): Partial<UserUpdatableFields> {
    return {
      ...(dto.email !== undefined && { email: dto.email }),
      ...(dto.username !== undefined && { username: dto.username }),
      ...(dto.isActive !== undefined && { isActive: dto.isActive }),
      ...(dto.membershipId !== undefined && { membershipId: dto.membershipId }),
    };
  }
  static toEntityFromDTORegister(dto: RegisterDTO): UserEntity {
    return new UserEntity(dto.email, dto.password, dto.username, false, false);
  }

  static toPrismaFromEntity(entity: UserEntity): Prisma.UserCreateInput {
    return {
      email: entity.email,
      password: entity.password,
      username: entity.username,
      isActive: entity.isActive,
      isDeleted: entity.isDeleted,
      membershipId: entity.membershipId,
    };
  }
}

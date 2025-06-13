import { UserCreateDTO, UserResponseDTO, UserUpdateDTO } from "./user.dto";
import { Prisma, User } from "@prisma/client";

export class UserMapper {
    static toDTO(user:User):UserResponseDTO {
        return {
            id: user.id,
            email: user.email,
            username: user.username,
            isActive: user.isActive,
            isDeleted: user.isDeleted,
            createdAt: user.createdAt.toISOString(),
            updatedAt: user.updatedAt.toISOString()
        }
    }
    static toDTOList(users:User[]): UserResponseDTO[] {
        return users.map(this.toDTO);
    }

    static toEntityFromCreate(dto:UserCreateDTO): Prisma.UserCreateInput {
        return {
            email: dto.email,
            username: dto.username,
            password: dto.password,
            membershipId: dto.membershipId,
            isActive: dto.isActive,
        }
    }
    static toEntityFromUpdate(dto:UserUpdateDTO): Partial<Prisma.UserUpdateInput> {
        return {
            ...(dto.email !== undefined && { email: dto.email }),
            ...(dto.username !== undefined && { username: dto.username }),
            ...(dto.isActive !== undefined && { isActive: dto.isActive }),
            ...(dto.membershipId !== undefined && { membershipId: dto.membershipId }),
        }
    }

}

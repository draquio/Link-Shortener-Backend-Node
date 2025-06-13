import { User } from "@prisma/client";
import { CreateUserDTO, UserResponseDTO } from "./user.dto";

export const UserToDTO = (user:User): UserResponseDTO => ({
    id: user.id,
    email: user.email,
    username: user.username,
    isActive: user.isActive,
    isDeleted: user.isDeleted,
    createdAt: user.createdAt.toISOString(),
    updatedAt: user.updatedAt.toISOString()
})

export const UserListToDTOs = (users:User[]): UserResponseDTO[] => {
    return users.map(UserToDTO);
}


export const DtoCreateToUser = (userDTO:CreateUserDTO) => ({
    username: userDTO.username,
    email: userDTO.email,
    password: userDTO.password
})
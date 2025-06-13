export interface CreateUserDTO {
  email: string;
  username: string;
  password: string;
  membershipId?: number;
  isActive?: boolean
}

export interface UpdateUserDTO {
  username?: string;
  email?: string;
  isActive?: boolean;
  membershipId?: number;
}

export interface UserResponseDTO {
  id: number;
  email: string;
  username: string;
  isActive: boolean;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  membershipId?: number;
}

import { prisma } from "@/config/prismaClient";
import { UserUpdatableFields } from "./user.dto";
import { UserEntity } from "./user.entity";
import { UserMapper } from "./user.mapper";

type GetAllResponse = { usersEntity: UserEntity[]; total: number };

export class UserRepository {
  async getAll(page: number, pageSize: number, isDeleted: boolean): Promise<GetAllResponse> {
    const skip = (page - 1) * pageSize;
    const take = pageSize;
    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where: { isDeleted },
        skip,
        take,
        orderBy: { createdAt: "asc" },
      }),
      prisma.user.count({ where: { isDeleted } }),
    ]);
    const usersEntity = UserMapper.toEntityFromPrismaList(users);
    return { usersEntity, total };
  }

  async getById(id: number): Promise<UserEntity | null> {
    const user = await prisma.user.findUnique({ where: { id } });
    const userEntity = user ? UserMapper.toEntityFromPrisma(user) : null;
    return userEntity;
  }

  async getByEmail(email: string): Promise<UserEntity | null> {
    const user = await prisma.user.findUnique({ where: { email } });
    const userEntity = user ? UserMapper.toEntityFromPrisma(user) : null;
    return userEntity;
  }

  async create(user: UserEntity): Promise<UserEntity> {
    const data = UserMapper.toPrismaFromEntity(user);
    const userCreated = await prisma.user.create({ data });
    const userEntity = UserMapper.toEntityFromPrisma(userCreated);
    return userEntity;
  }

  async update(id: number, data: Partial<UserUpdatableFields>): Promise<UserEntity> {
    const userUpdated = await prisma.user.update({
      where: { id },
      data,
    });
    const userEntity = UserMapper.toEntityFromPrisma(userUpdated);
    return userEntity;
  }

  async updatePassword(id: number, hashedPassword: string): Promise<UserEntity> {
    const user = await prisma.user.update({
      where: { id },
      data: { password: hashedPassword },
    });
    const userEntity = UserMapper.toEntityFromPrisma(user);
    return userEntity;
  }
  async softDelete(id: number): Promise<UserEntity> {
    const user = await prisma.user.update({
      where: { id },
      data: { isDeleted: true },
    });
    const userEntity = UserMapper.toEntityFromPrisma(user);
    return userEntity;
  }
}

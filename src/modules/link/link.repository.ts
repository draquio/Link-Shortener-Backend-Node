import { prisma } from "@/config/prismaClient";
import { Link, Prisma } from "@prisma/client";
import { LinkUpdatableFields } from "./link.dto";



export class LinkRepository {
  async create(data: Omit<Prisma.LinkCreateInput, "user">, userId: number) {
    return await prisma.link.create({
      data: {
        ...data,
        user: { connect: { id: userId } },
      },
    });
  }

  async getByShortCode(shortCode: string) {
    return await prisma.link.findUnique({ where: { shortCode } });
  }

  async getById(id: number) {
    return await prisma.link.findUnique({ where: { id } });
  }

  async getAllByUserId(
    userId: number,
    page: number,
    pageSize: number,
    isActive?: boolean
  ) {
    const whereCondition = {
      userId,
      ...(isActive !== undefined && { isActive }),
    }

    const [links, total] = await Promise.all([
      prisma.link.findMany({
      where: whereCondition,
      skip: (page - 1) * pageSize,
      take: pageSize,
      orderBy: { createdAt: "desc" },
    }),
      prisma.link.count({ where: whereCondition})
    ])
    return { links, total };
  }

  async delete(id: number) {
    await prisma.link.delete({ where: { id } });
  }

  async update(
    id: number,
    data: Partial<LinkUpdatableFields>
  ) {
    return await prisma.link.update({ where: { id }, data });
  }
}

import { prisma } from "@/config/prismaClient";
import { Prisma } from "@prisma/client";
import { LinkUpdatableFields } from "./link.dto";
import { LinkEntity } from "./link.entity";
import { LinkMapper } from "./link.mapper";



export class LinkRepository {
  async create(link: LinkEntity): Promise<LinkEntity> {
    const data = LinkMapper.toPrismaFromEntity(link)
    const linkCreated = await prisma.link.create({data});
    return LinkMapper.toEntityFromPrisma(linkCreated);
  }

  async getByShortCode(shortCode: string): Promise<LinkEntity | null> {
    return await prisma.link.findUnique({ where: { shortCode } });
  }

  async getById(id: number): Promise<LinkEntity | null> {
    return await prisma.link.findUnique({ where: { id } });
  }

  async getAllByUserId(
    userId: number,
    page: number,
    pageSize: number,
    isActive?: boolean
  ): Promise<{ links: LinkEntity[]; total: number }> {
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

  async delete(id: number): Promise<LinkEntity> {
    const link = await prisma.link.delete({ where: { id } });
    const linkDeleted = LinkMapper.toEntityFromPrisma(link);
    return linkDeleted;
  }

  async update(id: number, data: Partial<LinkUpdatableFields>): Promise<LinkEntity> {
    const link = await prisma.link.update({ where: { id }, data });
    return LinkMapper.toEntityFromPrisma(link);
  }
}

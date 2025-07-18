import { Link, Prisma } from "@prisma/client";
import {
  LinkCreateDTO,
  LinkResponseDTO,
  LinkUpdatableFields,
  LinkUpdateDTO,
} from "./link.dto";
import { LinkEntity } from "./link.entity";

export class LinkMapper {
  static toDTOFromEntity(link: LinkEntity): LinkResponseDTO {
    return {
      id: link.id!,
      originalUrl: link.originalUrl,
      shortCode: link.shortCode,
      isActive: link.isActive,
      createdAt: link.createdAt?.toISOString() || "",
      userId: link.userId,
      advertisementLink: link.advertisementLink || "",
    };
  }

  static toDTOFromEntityList(links: LinkEntity[]) {
    return links.map(this.toDTOFromEntity);
  }

  static toEntityFromCreateDTO(
    dto: LinkCreateDTO,
    userId: number,
    shortCode: string
  ): LinkEntity {
    return new LinkEntity(
      userId,
      dto.originalUrl,
      shortCode,
      true,
      dto.expirationDate ? new Date(dto.expirationDate) : null,
      dto.advertisementLink || null
    );
  }

  static toEntityFromUpdateDTO(dto: LinkUpdateDTO): Partial<LinkUpdatableFields> {
    return {
    ...(dto.advertisementLink !== undefined && { advertisementLink: dto.advertisementLink }),
    ...(dto.expirationDate !== undefined && { expirationDate: new Date(dto.expirationDate) }),
    ...(dto.isActive !== undefined && { isActive: dto.isActive }),
    };

  }

  static toPrismaFromEntity(entity: LinkEntity): Prisma.LinkCreateInput {
    return {
      originalUrl: entity.originalUrl,
      shortCode: entity.shortCode,
      isActive: entity.isActive,
      expirationDate: entity.expirationDate ? entity.expirationDate : undefined,
      advertisementLink: entity.advertisementLink || undefined,
      user: {
        connect: { id: entity.userId },
      },
    };
  }
  static toEntityFromPrisma(link: Link): LinkEntity {
    return new LinkEntity(
      link.userId,
      link.originalUrl,
      link.shortCode,
      link.isActive,
      link.expirationDate ? new Date(link.expirationDate) : null,
      link.advertisementLink || null,
      link.id,
      link.createdAt ? new Date(link.createdAt) : null
    );
  }
}

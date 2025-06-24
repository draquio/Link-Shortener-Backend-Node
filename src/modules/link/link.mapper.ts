import { Link, Prisma } from "@prisma/client";
import { LinkResponseDTO, LinkUpdatableFields, LinkUpdateDTO } from "./link.dto";

export class LinkMapper {
  static toDTO(link: Link): LinkResponseDTO {
    return {
      id: link.id,
      originalUrl: link.originalUrl,
      shortCode: link.shortCode,
      isActive: link.isActive,
      createdAt: link.createdAt.toISOString(),
      userId: link.userId,
      advertisementLink: link.advertisementLink || "",
    };
  }

  static toDTOList(links: Link[]) {
    return links.map(this.toDTO);
  }
static toUpdateEntity(dto: LinkUpdateDTO): Partial<LinkUpdatableFields> {
    return {
      advertisementLink: dto.advertisementLink ?? undefined,
      expirationDate: dto.expirationDate ? new Date(dto.expirationDate) : undefined,
      isActive: dto.isActive ?? undefined
    };
  }
}

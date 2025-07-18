import { Visit } from "@prisma/client";
import { VisitRegisterDTO, VisitResponseDTO } from "./visit.dto";
import { VisitEntity } from "./visit.entity";

export class VisitMapper {
  static toDTO(visit: Visit) {
    return {
      id: visit.id,
      linkId: visit.linkId,
      visitDate: visit.visitDate.toISOString(),
      ip: visit.ip || undefined,
      userAgent: visit.userAgent || undefined,
      referrer: visit.referrer || undefined,
      country: visit.country || undefined,
    };
  }

  static toEntity(dto: VisitRegisterDTO, linkId: number, country?: string): VisitEntity {
    return new VisitEntity(linkId, dto.ip, dto.userAgent, dto.referrer, dto.country);
  }
}

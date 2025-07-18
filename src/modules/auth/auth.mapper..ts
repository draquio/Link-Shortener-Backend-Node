import { VerificationToken } from "@prisma/client";
import { LoginDTO } from "./auth.dto";
import { VerificationTokenEntity } from "./auth.entity";

export class VerificationTokenMapper {
    // Prisma a Entity
    static toEntityFromPrisma(prisma: VerificationToken): VerificationTokenEntity {
        return new VerificationTokenEntity(
            prisma.userId,
            prisma.token,
            prisma.expirationDate,
            prisma.type,
            prisma.isUsed,
            prisma.id
        )
    }
}
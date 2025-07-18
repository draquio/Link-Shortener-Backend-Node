import { prisma } from "@/config/prismaClient";
import { TokenType } from "@prisma/client";
import { VerificationTokenEntity } from "./auth.entity";
import { VerificationTokenMapper } from "./auth.mapper.";


export class AuthRepository {
  async saveVerificationToken(userId: number, token: string, type: TokenType, expiresInMs: number): Promise<VerificationTokenEntity> {
    const expirationDate = new Date(Date.now() + expiresInMs);
    const savedVerificationToken = await prisma.verificationToken.create({
      data: {
        userId,
        token,
        type,
        expirationDate,
        isUsed: false,
      },
    });
    const TokenEntity = VerificationTokenMapper.toEntityFromPrisma(savedVerificationToken);
    return TokenEntity;
  }
  async saveRefreshToken(userId: number, refreshToken: string, expiresInMs: number) {
    const token = refreshToken
    return await prisma.refreshToken.create({
      data: {
        userId,
        token,
        expiresAt: new Date(Date.now() + expiresInMs),
        isRevoked: false,
      },
    });
  }

  async revokeRefreshToken(id: number) {
    return await prisma.refreshToken.update({
      where: { id },
      data: { isRevoked: true },
    });
  }

  async getValidToken(token: string, type: TokenType) {
    return await prisma.verificationToken.findFirst({
      where: {
        token,
        type,
        isUsed: false,
        expirationDate: {
          gte: new Date(),
        },
      },
    });
  }

  async markTokenAsUsed(tokenId: number) {
    return await prisma.verificationToken.update({
      where: { id: tokenId },
      data: { isUsed: true },
    });
  }

  async getRefreshToken(token: string) {
    return await prisma.refreshToken.findFirst({
      where: { token, expiresAt: { gt: new Date() }, isRevoked: false },
    });
  }
}

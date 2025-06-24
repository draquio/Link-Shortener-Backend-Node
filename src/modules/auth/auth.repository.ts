import { prisma } from "@/config/prismaClient";
import { TokenType } from "@prisma/client";

export class AuthRepository {
  async saveVerificationToken(
    userId: number,
    token: string,
    type: TokenType,
    expiresInMs: number
  ) {
    const expirationDate = new Date(Date.now() + expiresInMs);
    return await prisma.verificationToken.create({
      data: {
        userId,
        token,
        type,
        expirationDate,
        isUsed: false,
      },
    });
  }
  async saveRefreshToken(userId: number, token: string, expiresInMs: number) {
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

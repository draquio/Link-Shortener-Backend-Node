import { TokenType } from "@prisma/client";

export class VerificationTokenEntity {
  constructor(
    public readonly userId: number,
    public readonly token: string,
    public readonly expirationDate: Date,
    public readonly type: TokenType,
    public readonly isUsed: boolean = false,
    public readonly id?: number,
  ) {}
}
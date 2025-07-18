export class UserEntity {
  constructor(
    public readonly email: string,
    public readonly password: string,
    public readonly username: string,
    public readonly isActive: boolean = false,
    public readonly isDeleted: boolean = false,
    public readonly membershipId?: number | null,
    public readonly id?: number,
    public readonly createdAt?: Date,
    public readonly updatedAt?: Date
  ) {}
}

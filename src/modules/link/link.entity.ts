export class LinkEntity {
    constructor(
        public readonly userId: number,
        public readonly originalUrl: string,
        public readonly shortCode: string,
        public readonly isActive: boolean = true,
        public readonly expirationDate?: Date | null,
        public readonly advertisementLink?: string | null,
        public readonly id?: number,
        public readonly createdAt?: Date | null,
    ){}
}

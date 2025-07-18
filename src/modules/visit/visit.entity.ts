export class VisitEntity {
  constructor(
    public readonly linkId: number,
    public readonly ip?: string,
    public readonly userAgent?: string,
    public readonly referrer?: string,
    public readonly country?: string
  ) {}
}
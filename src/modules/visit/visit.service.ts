import { NotFoundError } from "@/errors/NotFoundError";
import { LinkRepository } from "../link/link.repository";
import { VisitRepository } from "./visit.repository";
import { VisitRegisterDTO } from "./visit.dto";
import { VisitMapper } from "./visit.mapper";
import { GeoService } from "../geo/geo.service";
import { RedisService } from "../redis/redis.service";

export class VisitService {
  constructor(
    private readonly visitRepository: VisitRepository,
    private readonly linkRepository: LinkRepository,
    private readonly geoService: GeoService,
    private readonly redisService: RedisService
  ) {}

  async processVisit(
    shortCode: string,
    meta: VisitRegisterDTO
  ): Promise<string> {
    const cacheKey = `short:${shortCode}`;
    const cachedUrl = await this.redisService.get(cacheKey);
    if (cachedUrl) {
      await this.registerVisit(meta, shortCode);
      return cachedUrl;
    }
    const link = await this.linkRepository.getByShortCode(shortCode);
    if (!link) throw new NotFoundError("Shortcode");

    await this.redisService.set(cacheKey, link.originalUrl, 3600);
    await this.registerVisit(meta, shortCode, link.id!);

    return link.originalUrl;
  }

  private async registerVisit(
    meta: VisitRegisterDTO,
    shortCode: string,
    linkId?: number
  ) {
    const id = linkId ?? (await this.linkRepository.getByShortCode(shortCode))?.id;
    if (!id) return;

    const country = await this.geoService.getCountryFromIp(meta.ip);
    const visitEntity = VisitMapper.toEntity(meta, id, country);
    await this.visitRepository.create(visitEntity);
  }
}

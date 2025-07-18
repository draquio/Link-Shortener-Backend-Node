import { mock } from "jest-mock-extended";
import { VisitService } from "../visit.service";
import { VisitRepository } from "../visit.repository";
import { LinkRepository } from "../../link/link.repository";
import { GeoService } from "../../geo/geo.service";
import { RedisService } from "../../redis/redis.service";
import { VisitRegisterDTO } from "../visit.dto";
import { NotFoundError } from "@/errors/NotFoundError";
import { VisitMapper } from "../visit.mapper";

jest.mock("../visit.mapper");

describe("VisitService", () => {
  const visitRepository = mock<VisitRepository>();
  const linkRepository = mock<LinkRepository>();
  const geoService = mock<GeoService>();
  const redisService = mock<RedisService>();

  const service = new VisitService(
    visitRepository,
    linkRepository,
    geoService,
    redisService
  );

  const meta: VisitRegisterDTO = {
    ip: "1.2.3.4",
    userAgent: "test-agent",
    referrer: "https://referrer.com",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("devuelve la URL desde cache si existe en Redis", async () => {
    redisService.get.mockResolvedValue("https://cached.com");
    linkRepository.getByShortCode.mockResolvedValue({ id: 1 } as any);
    geoService.getCountryFromIp.mockResolvedValue("Bolivia");
    (VisitMapper.toEntity as jest.Mock).mockReturnValue({ visit: "cached" });

    const result = await service.processVisit("abc123", meta);

    expect(result).toBe("https://cached.com");
    expect(visitRepository.create).toHaveBeenCalledWith({ visit: "cached" });
  });

  it("busca en DB si no está en Redis, y luego cachea", async () => {
    redisService.get.mockResolvedValue(null);
    linkRepository.getByShortCode.mockResolvedValue({
      id: 1,
      originalUrl: "https://fromdb.com",
    } as any);
    geoService.getCountryFromIp.mockResolvedValue("Bolivia");
    (VisitMapper.toEntity as jest.Mock).mockReturnValue({ visit: "mocked" });

    const result = await service.processVisit("xyz123", meta);

    expect(linkRepository.getByShortCode).toHaveBeenCalledWith("xyz123");
    expect(redisService.set).toHaveBeenCalledWith(
      "short:xyz123",
      "https://fromdb.com",
      3600
    );
    expect(visitRepository.create).toHaveBeenCalledWith({ visit: "mocked" });
    expect(result).toBe("https://fromdb.com");
  });

  it("lanza NotFoundError si no existe el shortCode", async () => {
    redisService.get.mockResolvedValue(null);
    linkRepository.getByShortCode.mockResolvedValue(null);

    await expect(service.processVisit("invalid", meta)).rejects.toThrow(
      NotFoundError
    );
  });

  it("continúa funcionando si Redis falla", async () => {
    redisService.get.mockResolvedValue(null);
    redisService.set.mockResolvedValue();

    linkRepository.getByShortCode.mockResolvedValue({
      id: 99,
      originalUrl: "https://fallback.com",
    } as any);
    geoService.getCountryFromIp.mockResolvedValue("Chile");
    (VisitMapper.toEntity as jest.Mock).mockReturnValue({ visit: "fallback" });

    const result = await service.processVisit("offline", meta);

    expect(result).toBe("https://fallback.com");
    expect(visitRepository.create).toHaveBeenCalledWith({ visit: "fallback" });
  });
});

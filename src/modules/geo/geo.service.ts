import { GeoEntity } from "./geo.entity";

export class GeoService {
  private readonly BASE_URL = "http://ip-api.com/json/";

  async getInfoFromIp(ip?: string): Promise<GeoEntity | undefined> {
    if (!ip) return;
    try {
      const res = await fetch(`${this.BASE_URL}${ip}`);
      if (!res.ok) return;

      const data = await res.json();

      if (data.status !== "success") return;

      return new GeoEntity(
        data.country,
        data.countryCode,
        data.city,
        data.regionName,
        data.isp
      );
    } catch (err) {
      console.error("GeoService error:", err);
      return;
    }
  }

  async getCountryFromIp(ip?: string): Promise<string | undefined> {
    const info = await this.getInfoFromIp(ip);
    return info?.country;
  }
}

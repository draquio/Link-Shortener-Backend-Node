import Redis from "ioredis";
import { ENV } from "../../utils/constants";

export class RedisService {
  private readonly client: Redis;

  constructor() {
    this.client = new Redis({
      host: ENV.REDIS.HOST,
      port: Number(ENV.REDIS.PORT),
      password: ENV.REDIS.PASSWORD,
      lazyConnect: true,
      connectTimeout: 1000,
      maxRetriesPerRequest: 1,
      enableOfflineQueue: false,
    });
    this.client.on("error", (err) => {
      console.error("Redis connection error:", err.message);
    });
  }

  private async ensureConnected() {
    if (this.client.status !== "ready") {
      try {
        await this.client.connect();
      } catch (err) {
        console.warn("Redis connection failed:", (err as Error).message);
        throw err;
      }
    }
  }

  async get(key: string): Promise<string | null> {
    try {
      await this.ensureConnected();
      return await this.client.get(key);
    } catch {
      return null;
    }
  }

  async set(key: string, value: string, ttlSeconds = 3600): Promise<void> {
    try {
      await this.ensureConnected();
      await this.client.set(key, value, "EX", ttlSeconds);
    } catch {}
  }

  async del(key: string): Promise<void> {
    try {
      await this.ensureConnected();
      await this.client.del(key);
    } catch {}
  }
}

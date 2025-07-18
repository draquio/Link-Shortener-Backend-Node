import Redis from "ioredis";
import { ENV } from "../../utils/constants";

export class RedisService {
  private readonly client: Redis;

  constructor() {
    this.client = new Redis({
      host: ENV.REDIS.HOST,
      port: Number(ENV.REDIS.PORT),
      password: ENV.REDIS.PASSWORD,
    });
  }

  async get(key: string): Promise<string | null> {
    try {
      return await this.client.get(key);
    } catch{
      return null;
    }
  }

  async set(key: string, value: string, ttlSeconds = 3600): Promise<void> {
    try {
      await this.client.set(key, value, "EX", ttlSeconds);
    } catch{}
  }

  async del(key: string): Promise<void> {
    try {
      await this.client.del(key);
    } catch{}
  }
}

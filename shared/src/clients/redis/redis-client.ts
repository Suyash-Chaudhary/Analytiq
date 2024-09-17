import { createClient, RedisClientType } from "redis";

class RedisClient {
  // Singleton Class implementation
  private static _client: RedisClientType | null = null;
  private constructor() {}

  static initialize(redisUrl?: string) {
    if (!redisUrl) throw new Error(`Missing Redis URL`);
    if (!this._client) {
      this._client = createClient({ url: redisUrl });
    }
  }

  static async connect() {
    if (!this._client)
      throw new Error(
        "Please initialize() RedisClient before trying to connect()"
      );
    await this._client.connect();
  }

  public static client() {
    if (!this._client)
      throw new Error("Cannot access client before initialization.");
    if (!this._client.isOpen)
      throw new Error("Cannot access client before connecting.");
    return this._client;
  }
}

export { RedisClient };

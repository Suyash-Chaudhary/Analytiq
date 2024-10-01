import { createClient, RedisClientType } from "redis";

class RedisClient {
  // Doubleton Class implementation
  private static _publisher: RedisClientType | null = null;
  private static _subscriber: RedisClientType | null = null;
  private constructor() {}

  static initialize(redisUrl?: string) {
    if (!redisUrl) throw new Error(`Missing Redis URL`);
    if (!this._publisher) {
      this._publisher = createClient({ url: redisUrl });
    }
    if (!this._subscriber) {
      this._subscriber = createClient({ url: redisUrl });
    }
  }

  static async connect() {
    if (!this._publisher || !this._subscriber)
      throw new Error(
        "Please initialize() RedisClient before trying to connect()"
      );
    const promises = [this._publisher.connect(), this._subscriber.connect()];
    await Promise.all(promises);
  }

  public static publisher() {
    if (!this._publisher)
      throw new Error("Cannot access publisher before initialization.");
    if (!this._publisher.isOpen)
      throw new Error("Cannot access publisher before connecting.");
    return this._publisher;
  }

  public static subscriber() {
    if (!this._subscriber)
      throw new Error("Cannot access subscriber before initialization.");
    if (!this._subscriber.isOpen)
      throw new Error("Cannot access subscriber before connecting.");
    return this._subscriber;
  }
}

export { RedisClient };

import { RedisClientType } from "redis";

class RedisPubSubPublisher {
  private _client: RedisClientType;

  private static _instance: RedisPubSubPublisher | null;
  private constructor(client: RedisClientType) {
    this._client = client;
  }
  static initialize(client: RedisClientType) {
    if (!this._instance) this._instance = new RedisPubSubPublisher(client);
  }

  static async publish(channel: string, message: string) {
    if (!this._instance)
      throw new Error(
        "RedisPubSubPublished must be initialized before calling publish()"
      );
    await this._instance._client.publish(channel, message);
  }
}

export default RedisPubSubPublisher;

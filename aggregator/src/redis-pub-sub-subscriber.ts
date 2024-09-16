import { RedisClientType } from "redis";

class RedisPubSubSubscriber {
  private _client: RedisClientType;

  private static _instance: RedisPubSubSubscriber | null;
  private constructor(client: RedisClientType) {
    this._client = client;
  }
  static initialize(client: RedisClientType) {
    if (!this._instance) this._instance = new RedisPubSubSubscriber(client);
  }

  static subscribe(channel: string | string[], cb: (data: any) => void) {
    this._instance?._client.subscribe(channel, (message) => {
      try {
        const data = JSON.parse(message);
        cb(data);
      } catch (err) {
        console.error(err);
      }
    });
  }
}

export default RedisPubSubSubscriber;

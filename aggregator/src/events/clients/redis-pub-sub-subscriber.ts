import { RedisClientType } from "redis";
import { Subjects } from "../types/enums";

class RedisPubSubSubscriber {
  private _client: RedisClientType;

  private static _instance: RedisPubSubSubscriber | null;
  private constructor(client: RedisClientType) {
    this._client = client;
  }
  static initialize(client: RedisClientType) {
    if (!this._instance) this._instance = new RedisPubSubSubscriber(client);
  }

  static subscribe(
    channel: Subjects | Subjects[],
    cb: (data: any) => Promise<void>
  ) {
    this._instance?._client.subscribe(channel, async (message) => {
      try {
        const data = JSON.parse(message);
        await cb(data);
      } catch (err) {
        console.error(err);
      }
    });
  }
}

export default RedisPubSubSubscriber;

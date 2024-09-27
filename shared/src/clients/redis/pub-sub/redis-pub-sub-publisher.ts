import { RedisClientType } from "redis";
import { CustomEvent } from "../../../events/types/custom-event";

export abstract class RedisPSPublisher<EventType extends CustomEvent> {
  abstract channel(payload: EventType["data"]): string;

  async publish(client: RedisClientType, data: EventType["data"]) {
    const message = JSON.stringify(data);
    await client.publish(this.channel(data), message);
  }
}

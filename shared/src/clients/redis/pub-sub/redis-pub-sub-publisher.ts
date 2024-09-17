import { RedisClientType } from "redis";
import { CustomEvent } from "../../../events/custom-event";

export abstract class RedisPSPublisher<EventType extends CustomEvent> {
  abstract get subject(): EventType["subject"];

  async publish(client: RedisClientType, data: EventType["data"]) {
    const message = JSON.stringify(data);
    await client.publish(this.subject, message);
  }
}

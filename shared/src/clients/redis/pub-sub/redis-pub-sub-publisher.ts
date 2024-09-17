import { RedisClientType } from "redis";
import { CustomEvent } from "../../../events/custom-event";

export abstract class RedisPSSubscriber<EventType extends CustomEvent> {
  abstract get subject(): EventType["subject"];
  abstract validator: (payload: any) => EventType["data"];
  abstract handler: (payload: EventType["data"]) => Promise<void>;
  protected constructor() {}

  subscribe(client: RedisClientType) {
    client.subscribe(this.subject, async (message) => {
      try {
        const payload = JSON.parse(message);
        const data = this.validator(payload);
        await this.handler(data);
      } catch (error) {
        throw new Error(
          `ERROR: Unable to process message.\n Channel: ${this.subject}\n\n Message: ${message}\n\n ERROR: ${error}`
        );
      }
    });
  }
}

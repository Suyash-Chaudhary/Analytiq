import { RedisClientType } from "redis";
import { CustomEvent } from "../../../events/types/custom-event";

export abstract class RedisPSSubscriber<EventType extends CustomEvent> {
  abstract get channel(): string;
  abstract validator(payload: any): EventType["data"];
  abstract handler(payload: EventType["data"]): Promise<void>;

  async subscribe(client: RedisClientType) {
    client.subscribe(this.channel, async (message) => {
      try {
        const payload = JSON.parse(message);
        const data = this.validator(payload);
        await this.handler(data);
      } catch (error) {
        throw new Error(
          `ERROR: Unable to process message.\n Channel: ${this.channel}\n\n Message: ${message}\n\n ERROR: ${error}`
        );
      }
    });
  }

  async unsubscribe(client: RedisClientType) {
    await client.unsubscribe(this.channel);
  }
}

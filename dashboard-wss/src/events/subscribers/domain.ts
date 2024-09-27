import {
  DomainEvent,
  DomainEventSchema,
  RedisPSSubscriber,
} from "@analytiq/shared";
import { WebsocketManager } from "../../state/websocket-manager";

export class DomainEventSubscriber extends RedisPSSubscriber<DomainEvent> {
  channel: string;

  constructor(channel: string) {
    super();
    this.channel = channel;
  }

  validator(payload: any): DomainEvent["data"] {
    const result = DomainEventSchema.safeParse(payload);
    if (!result.success) throw new Error("Invalid format for VisitorEvent");
    return result.data;
  }

  async handler(payload: DomainEvent["data"]) {
    WebsocketManager.forwardDomainEventToSockets(payload, payload.data.domain);
  }
}

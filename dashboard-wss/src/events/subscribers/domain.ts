import {
  DomainEvent,
  DomainEventSchema,
  RedisPSSubscriber,
} from "@analytiq/shared";
import { WebsocketManager } from "../../state/websocket-manager";

export class DomainEventSubscriber extends RedisPSSubscriber<DomainEvent> {
  domain: string;
  get channel(): string {
    return `domain:${this.domain}`;
  }

  constructor(domain: string) {
    super();
    this.domain = domain;
  }

  validator(payload: any): DomainEvent["data"] {
    const result = DomainEventSchema.safeParse(payload);
    if (!result.success) throw new Error("Invalid format for VisitorEvent");
    return result.data;
  }

  async handler(payload: DomainEvent["data"]) {
    console.log({ payload });
    WebsocketManager.forwardDomainEventToSockets(payload, payload.data.domain);
  }
}

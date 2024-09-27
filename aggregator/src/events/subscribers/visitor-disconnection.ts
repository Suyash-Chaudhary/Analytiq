import {
  RedisClient,
  RedisPSSubscriber,
  Subjects,
  VisitorDisconnectionEventPayloadSchema,
} from "@analytiq/shared";
import { VisitorDisconnectionEvent } from "@analytiq/shared/dist/events/types/visitor/visitor-disconnection";
import DomainManager from "../../state/domain-manager";
import { DomainVisitCompletedPublisher } from "../publishers/domain/visit-completed";

export class VisitorDisconnectionSubscriber extends RedisPSSubscriber<VisitorDisconnectionEvent> {
  readonly channel = Subjects.VisitorDisconnection;

  validator(payload: any) {
    const result = VisitorDisconnectionEventPayloadSchema.safeParse(payload);
    if (!result.success)
      throw new Error(`Invalid payload for VisitorDisconnectionEvent`);
    return result.data;
  }

  async handler(payload: VisitorDisconnectionEvent["data"]): Promise<void> {
    DomainManager.removeVisit(
      payload.data.domain,
      payload.data.subdomain,
      payload.data.id
    );

    await DomainVisitCompletedPublisher.instance().publish(
      RedisClient.client(),
      {
        subject: Subjects.DomainVisitCompleted,
        data: {
          domain: payload.data.domain,
          subdomain: payload.data.subdomain,
          id: payload.data.id,
          ip: payload.data.ip,
          timeStamp: payload.data.timeStamp,
        },
      }
    );
  }

  // Singleton class
  private constructor() {
    super();
  }
  private static _instance: VisitorDisconnectionSubscriber | null = null;
  static instance() {
    if (!this._instance) this._instance = new VisitorDisconnectionSubscriber();
    return this._instance;
  }
}

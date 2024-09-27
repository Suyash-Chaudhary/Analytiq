import {
  RedisClient,
  RedisPSSubscriber,
  Subjects,
  VisitorReconnectionEvent,
  VisitorReconnectionEventPayloadSchema,
} from "@analytiq/shared";
import DomainManager from "../../state/domain-manager";
import { DomainVisitUpdatedPublisher } from "../publishers/domain/visit-updated";

export class VisitorReconnectionSubscriber extends RedisPSSubscriber<VisitorReconnectionEvent> {
  readonly channel = Subjects.VisitorReconnection;

  validator(payload: any): VisitorReconnectionEvent["data"] {
    const result = VisitorReconnectionEventPayloadSchema.safeParse(payload);
    if (!result.success)
      throw new Error(
        `Invalid payload for VisitorReconnectionEvent: ${result.error}`
      );
    return result.data;
  }

  async handler(payload: VisitorReconnectionEvent["data"]) {
    const visit = DomainManager.updateUrl(
      payload.data.domain,
      payload.data.subdomain,
      payload.data.id,
      payload.data.timeStamp,
      payload.data.page
    );

    await DomainVisitUpdatedPublisher.instance().publish(RedisClient.client(), {
      subject: Subjects.DomainVisitUpdated,
      data: visit,
    });

    console.log({ visit });
  }

  // Singleton class
  private constructor() {
    super();
  }
  private static _instance: VisitorReconnectionSubscriber | null = null;
  static instance() {
    if (!this._instance) this._instance = new VisitorReconnectionSubscriber();
    return this._instance;
  }
}

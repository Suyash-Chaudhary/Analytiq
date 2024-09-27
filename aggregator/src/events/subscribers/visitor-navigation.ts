import {
  RedisClient,
  RedisPSSubscriber,
  Subjects,
  VisitorNavigationEvent,
  VisitorNavigationEventPayloadSchema,
} from "@analytiq/shared";
import DomainManager, { IVisit } from "../../state/domain-manager";
import { DomainVisitUpdatedPublisher } from "../publishers/domain/visit-updated";

export class VisitorNavigationSubscriber extends RedisPSSubscriber<VisitorNavigationEvent> {
  readonly channel = Subjects.VisitorNavigation;

  validator(payload: any): VisitorNavigationEvent["data"] {
    const result = VisitorNavigationEventPayloadSchema.safeParse(payload);
    if (!result.success)
      throw new Error(
        `Invalid payload for VisitorNavigationEvent: ${result.error}`
      );
    return result.data;
  }

  async handler(payload: VisitorNavigationEvent["data"]) {
    if (payload.data.records.length === 0) return;

    let visit: IVisit;

    payload.data.records.forEach((record) => {
      visit = DomainManager.updateUrl(
        record.domain,
        record.subdomain,
        record.id,
        record.timeStamp,
        record.page
      );
    });

    await DomainVisitUpdatedPublisher.instance().publish(RedisClient.client(), {
      subject: Subjects.DomainVisitUpdated,
      data: visit!,
    });

    console.log({ visit: visit! });
  }

  // Singleton class
  private constructor() {
    super();
  }
  private static _instance: VisitorNavigationSubscriber | null = null;
  static instance() {
    if (!this._instance) this._instance = new VisitorNavigationSubscriber();
    return this._instance;
  }
}

import {
  RedisClient,
  RedisPSSubscriber,
  Subjects,
  VisitorVisibilityChangeEvent,
  VisitorVisibilityChangeEventPayloadSchema,
} from "@analytiq/shared";
import DomainManager, { IVisit } from "../../state/domain-manager";
import { DomainVisitUpdatedPublisher } from "../publishers/domain/visit-updated";

export class VisitorVisibilityChangeSubscriber extends RedisPSSubscriber<VisitorVisibilityChangeEvent> {
  readonly channel = Subjects.VisitorVisibilityChange;

  validator(payload: any): VisitorVisibilityChangeEvent["data"] {
    const result = VisitorVisibilityChangeEventPayloadSchema.safeParse(payload);
    if (!result.success)
      throw new Error(
        `Invalid payload for VisitorVisibilityChangeEvent: ${result.error}`
      );
    return result.data;
  }

  async handler(payload: VisitorVisibilityChangeEvent["data"]) {
    if (payload.data.records.length === 0) return;

    let visit: IVisit | undefined;

    payload.data.records.forEach((record) => {
      visit = DomainManager.updateVisibility(
        record.domain,
        record.subdomain,
        record.id,
        record.timeStamp,
        record.visibility
      );
    });

    if (visit)
      await DomainVisitUpdatedPublisher.instance().publish(
        RedisClient.publisher(),
        {
          subject: Subjects.DomainVisitUpdated,
          data: visit!,
        }
      );
  }

  // Singleton class
  private constructor() {
    super();
  }
  private static _instance: VisitorVisibilityChangeSubscriber | null = null;
  static instance() {
    if (!this._instance)
      this._instance = new VisitorVisibilityChangeSubscriber();
    return this._instance;
  }
}

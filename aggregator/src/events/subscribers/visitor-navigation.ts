import {
  RedisPSSubscriber,
  Subjects,
  VisitorNavigationEvent,
  VisitorNavigationEventPayloadSchema,
} from "@analytiq/shared";
import DomainManager from "../../state/domain-manager";

export class VisitorNavigationSubscriber extends RedisPSSubscriber<VisitorNavigationEvent> {
  readonly subject = Subjects.VisitorNavigation;

  validator(payload: any): VisitorNavigationEvent["data"] {
    const result = VisitorNavigationEventPayloadSchema.safeParse(payload);
    if (!result.success)
      throw new Error(
        `Invalid payload for VisitorNavigationEvent: ${result.error}`
      );
    return result.data;
  }

  async handler(payload: VisitorNavigationEvent["data"]) {
    let visit;
    payload.data.records.forEach((record) => {
      visit = DomainManager.updateUrl(
        record.domain,
        record.subdomain,
        record.id,
        record.timeStamp,
        record.page
      );
    });
    console.log({ visit });
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

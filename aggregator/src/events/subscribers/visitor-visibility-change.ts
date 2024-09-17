import {
  RedisPSSubscriber,
  Subjects,
  VisitorVisibilityChangeEvent,
  VisitorVisibilityChangeEventPayloadSchema,
} from "@analytiq/shared";
import DomainManager from "../../state/domain-manager";

export class VisitorVisibilityChangeSubscriber extends RedisPSSubscriber<VisitorVisibilityChangeEvent> {
  readonly subject = Subjects.VisitorVisibilityChange;

  validator(payload: any): VisitorVisibilityChangeEvent["data"] {
    const result = VisitorVisibilityChangeEventPayloadSchema.safeParse(payload);
    if (!result.success)
      throw new Error(
        `Invalid payload for VisitorVisibilityChangeEvent: ${result.error}`
      );
    return result.data;
  }

  async handler(payload: VisitorVisibilityChangeEvent["data"]) {
    let visit;
    payload.data.records.forEach((record) => {
      visit = DomainManager.updateVisibility(
        record.domain,
        record.subdomain,
        record.id,
        record.timeStamp,
        record.visibility
      );
    });
    console.log({ visit });
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

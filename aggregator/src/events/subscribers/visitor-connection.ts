import {
  RedisPSSubscriber,
  Subjects,
  VisitorConnectionEvent,
  VisitorConnectionEventPayloadSchema,
} from "@analytiq/shared";
import DomainManager from "../../state/domain-manager";

export class VisitorConnectionSubscriber extends RedisPSSubscriber<VisitorConnectionEvent> {
  readonly subject = Subjects.VisitorConnection;

  validator(payload: any): VisitorConnectionEvent["data"] {
    const result = VisitorConnectionEventPayloadSchema.safeParse(payload);
    if (!result.success)
      throw new Error(
        `Invalid payload for VisitorConnectionEvent: ${result.error}`
      );
    return result.data;
  }

  async handler(payload: VisitorConnectionEvent["data"]) {
    const visit = DomainManager.addVisit(
      payload.data.domain,
      payload.data.subdomain,
      payload.data.ip,
      payload.data.id,
      payload.data.timeStamp,
      payload.data.page
    );
    console.log({ visit });
  }

  // Singleton class
  private constructor() {
    super();
  }
  private static _instance: VisitorConnectionSubscriber | null = null;
  static instance() {
    if (!this._instance) this._instance = new VisitorConnectionSubscriber();
    return this._instance;
  }
}

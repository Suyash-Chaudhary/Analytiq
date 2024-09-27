import { RedisPSPublisher, Subjects, VisitorEvent } from "@analytiq/shared";

export class VisitorEventPublisher extends RedisPSPublisher<VisitorEvent> {
  channel(payload: VisitorEvent["data"]): string {
    return payload.subject;
  }

  // Singleton implementation
  private constructor() {
    super();
  }
  private static _instance: VisitorEventPublisher | null = null;
  static instance() {
    if (!this._instance) this._instance = new VisitorEventPublisher();
    return this._instance;
  }
}

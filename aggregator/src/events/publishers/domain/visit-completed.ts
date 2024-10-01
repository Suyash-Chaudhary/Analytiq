import { DomainVisitCompletedEvent, RedisPSPublisher } from "@analytiq/shared";

export class DomainVisitCompletedPublisher extends RedisPSPublisher<DomainVisitCompletedEvent> {
  channel(payload: DomainVisitCompletedEvent["data"]): string {
    return `domain:${payload.data.domain}`;
  }

  // Singleton Implementation
  private constructor() {
    super();
  }
  static _instance: DomainVisitCompletedPublisher | null = null;
  static instance() {
    if (!this._instance) this._instance = new DomainVisitCompletedPublisher();
    return this._instance;
  }
}

import {
  DomainVisitCreatedEvent,
  RedisPSPublisher,
  Subjects,
} from "@analytiq/shared";

export class DomainVisitCreatedPublisher extends RedisPSPublisher<DomainVisitCreatedEvent> {
  channel(payload: DomainVisitCreatedEvent["data"]): string {
    return payload.data.domain;
  }
  // Singleton Implementation
  private constructor() {
    super();
  }
  private static _instance: DomainVisitCreatedPublisher | null = null;
  static instance() {
    if (!this._instance) this._instance = new DomainVisitCreatedPublisher();
    return this._instance;
  }
}

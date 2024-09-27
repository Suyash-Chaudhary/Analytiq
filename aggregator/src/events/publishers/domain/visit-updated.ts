import {
  DomainVisitUpdatedEvent,
  RedisPSPublisher,
  Subjects,
} from "@analytiq/shared";

export class DomainVisitUpdatedPublisher extends RedisPSPublisher<DomainVisitUpdatedEvent> {
  channel(payload: DomainVisitUpdatedEvent["data"]): string {
    return payload.data.domain;
  }

  // Singleton Implementation
  private constructor() {
    super();
  }
  static _instance: DomainVisitUpdatedPublisher | null = null;
  static instance() {
    if (!this._instance) this._instance = new DomainVisitUpdatedPublisher();
    return this._instance;
  }
}

import { DomainVisitCreatedEvent } from "./domain/visit-created";
import { DomainVisitCompletedEvent } from "./domain/visit-completed";
import { DomainVisitUpdatedEvent } from "./domain/visit-updated";

type DomainEvent =
  | DomainVisitCreatedEvent
  | DomainVisitCompletedEvent
  | DomainVisitUpdatedEvent;

export { DomainEvent };

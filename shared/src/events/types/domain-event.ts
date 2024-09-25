import { DomainVisitCreatedEvent } from "./domain/visit-created";
import { DomainVisitCompletedEvent } from "./domain/visit-completed";
import { DomainVisitUpdatedEvent } from "./domain/visit-updated";
import { DomainVisitCompletedEventPayloadSchema } from "../validators/domain/visit-completed";

type DomainEvent =
  | DomainVisitCreatedEvent
  | DomainVisitCompletedEvent
  | DomainVisitUpdatedEvent;

export { DomainEvent };

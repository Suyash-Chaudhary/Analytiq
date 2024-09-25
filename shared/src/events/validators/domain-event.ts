import { z } from "zod";
import { DomainVisitCompletedEventPayloadSchema } from "./domain/visit-completed";
import { DomainVisitCreatedEventPayloadSchema } from "./domain/visit-created";
import { DomainVisitUpdatedEventPayloadSchema } from "./domain/visit-updated";

const DomainEventSchema = z.union([
  DomainVisitCompletedEventPayloadSchema,
  DomainVisitCreatedEventPayloadSchema,
  DomainVisitUpdatedEventPayloadSchema,
]);

export { DomainEventSchema };

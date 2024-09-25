import { z } from "zod";
import { Subjects } from "../../subjects";

const DomainVisitCompletedEventPayloadSchema = z.object({
  subject: z.literal(Subjects.DomainVisitCompleted),
  data: z.object({
    domain: z.string(),
    subdomain: z.string(),
    id: z.string().uuid(),
    ip: z.string().ip(),
    timeStamp: z.number(),
  }),
});

export { DomainVisitCompletedEventPayloadSchema };

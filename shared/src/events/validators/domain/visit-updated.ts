import { Subjects } from "../../subjects";
import { Visibility } from "../../visibility";
import { z } from "zod";

const DomainVisitUpdatedEventPayloadSchema = z.object({
  subject: z.literal(Subjects.DomainVisitUpdated),
  data: z.object({
    domain: z.string(),
    subdomain: z.string(),
    id: z.string().uuid(),
    ip: z.string().ip(),
    startTime: z.number(),
    visibility: z.nativeEnum(Visibility),
    query: z.string(),
    location: z.object({
      country: z.string(),
      region: z.string(),
      city: z.string(),
      ll: z.tuple([z.number(), z.number()]),
      metro: z.number(),
      zip: z.number(),
    }),
    page: z.string(),
    sessions: z.array(
      z.object({
        page: z.string(),
        query: z.string(),
        startTime: z.number(),
        visibility: z.array(
          z.object({
            visibility: z.nativeEnum(Visibility),
            timeStamp: z.number(),
          })
        ),
      })
    ),
  }),
});

export { DomainVisitUpdatedEventPayloadSchema };

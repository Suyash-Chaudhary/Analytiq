import { Subjects } from "../../subjects";
import { z } from "zod";
import { Visibility } from "../../visibility";

const VisitorVisibilityChangeEventPayloadSchema = z.object({
  subject: z.literal(Subjects.VisitorVisibilityChange),
  data: z.object({
    records: z.array(
      z.object({
        domain: z.string(),
        subdomain: z.string(),
        id: z.string().uuid(),
        ip: z.string().ip(),
        visibility: z.nativeEnum(Visibility),
        timeStamp: z.number(),
      })
    ),
  }),
});

export { VisitorVisibilityChangeEventPayloadSchema };

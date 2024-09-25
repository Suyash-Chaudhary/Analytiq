import { Subjects } from "../../subjects";
import { z } from "zod";

const VisitorNavigationEventPayloadSchema = z.object({
  subject: z.literal(Subjects.VisitorNavigation),
  data: z.object({
    records: z.array(
      z.object({
        domain: z.string(),
        subdomain: z.string(),
        id: z.string().uuid(),
        ip: z.string().ip(),
        page: z.string(),
        html: z.string(),
        timeStamp: z.number(),
      })
    ),
  }),
});

export { VisitorNavigationEventPayloadSchema };

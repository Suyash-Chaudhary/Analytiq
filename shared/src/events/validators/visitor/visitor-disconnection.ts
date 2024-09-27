import { Subjects } from "../../subjects";
import { z } from "zod";

const VisitorDisconnectionEventPayloadSchema = z.object({
  subject: z.literal(Subjects.VisitorDisconnection),
  data: z
    .object({
      domain: z.string(),
      subdomain: z.string(),
      id: z.string().uuid(),
      ip: z.string().ip(),
      timeStamp: z.number(),
    })
    .strict(),
});

export { VisitorDisconnectionEventPayloadSchema };

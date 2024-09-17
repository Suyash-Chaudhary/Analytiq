import { Subjects } from "../subjects";
import { z } from "zod";

const VisitorConnectionEventPayloadSchema = z.object({
  subject: z.literal(Subjects.VisitorConnection),
  data: z.object({
    domain: z.string(),
    subdomain: z.string(),
    id: z.string().uuid(),
    ip: z.string().ip(),
    page: z.string(),
    html: z.string(),
    timeStamp: z.number(),
  }),
});

export { VisitorConnectionEventPayloadSchema };

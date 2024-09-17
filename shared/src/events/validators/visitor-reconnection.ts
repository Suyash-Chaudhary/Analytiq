import { Subjects } from "../subjects";
import { z } from "zod";

const VisitorReconnectionEventPayloadSchema = z.object({
  subject: z.literal(Subjects.VisitorReconnection),
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

export { VisitorReconnectionEventPayloadSchema };

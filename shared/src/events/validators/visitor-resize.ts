import { Subjects } from "../subjects";
import { z } from "zod";

const VisitorResizeEventPayloadSchema = z.object({
  subject: z.literal(Subjects.VisitorResize),
  data: z.object({
    records: z.array(
      z.object({
        domain: z.string(),
        subdomain: z.string(),
        id: z.string().uuid(),
        ip: z.string().ip(),
        width: z.number(),
        height: z.number(),
        timeStamp: z.number(),
      })
    ),
  }),
});

export { VisitorResizeEventPayloadSchema };

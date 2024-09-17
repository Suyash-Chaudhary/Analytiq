import { Subjects } from "../subjects";
import { z } from "zod";

const VisitorMouseClickEventPayloadSchema = z.object({
  subject: z.literal(Subjects.VisitorMouseClick),
  data: z.object({
    records: z.array(
      z.object({
        domain: z.string(),
        subdomain: z.string(),
        id: z.string().uuid(),
        ip: z.string().ip(),
        x: z.number(),
        y: z.number(),
        timeStamp: z.number(),
      })
    ),
  }),
});

export { VisitorMouseClickEventPayloadSchema };

import { Subjects } from "./enums";
import { z } from "zod";

export const NavigationEventPayloadSchema = z.object({
  subject: z.literal(Subjects.Navigation),
  data: z.object({
    records: z.array(
      z.object({
        id: z.string().uuid(),
        ip: z.string().ip(),
        domain: z.string(),
        subdomain: z.string(),
        page: z.string(),
        html: z.string(),
        timeStamp: z.number(),
      })
    ),
  }),
});

interface NavigationEventRecord {
  domain: string;
  subdomain: string;
  id: string;
  ip: string;
  page: string;
  html: string;
  timeStamp: number;
}

interface NavigationEventPayload {
  subject: Subjects.Navigation;
  data: { records: NavigationEventRecord[] };
}

export interface NavigationEvent {
  subject: Subjects.Navigation;
  record: NavigationEventRecord;
  payload: NavigationEventPayload;
}

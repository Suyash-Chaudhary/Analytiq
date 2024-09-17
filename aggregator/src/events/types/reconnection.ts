import { Subjects } from "./enums";
import { z } from "zod";

export const ReconnectionEventPayloadSchema = z.object({
  subject: z.literal(Subjects.Reconnection),
  data: z.object({
    ip: z.string().ip(),
    id: z.string().uuid(),
    html: z.string(),
    domain: z.string(),
    subdomain: z.string(),
    page: z.string(),
    timeStamp: z.number(),
  }),
});

interface ReconnectionEventRecord {
  ip: string;
  id: string;
  html: string;
  domain: string;
  subdomain: string;
  page: string;
  timeStamp: number;
}

interface ReconnectionEventPayload {
  subject: Subjects.Reconnection;
  data: ReconnectionEventRecord;
}

export interface ReconnectionEvent {
  subject: Subjects.Reconnection;
  record: ReconnectionEventRecord;
  payload: ReconnectionEventPayload;
}

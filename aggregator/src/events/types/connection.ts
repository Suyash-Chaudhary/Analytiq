import { Subjects } from "./enums";
import { z } from "zod";

export const ConnectionEventPayloadSchema = z.object({
  subject: z.literal(Subjects.Connection),
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

interface ConnectionEventRecord {
  ip: string;
  id: string;
  html: string;
  domain: string;
  subdomain: string;
  page: string;
  timeStamp: number;
}

interface ConnectionEventPayload {
  subject: Subjects.Connection;
  data: ConnectionEventRecord;
}

export interface ConnectionEvent {
  subject: Subjects.Connection;
  record: ConnectionEventRecord;
  payload: ConnectionEventPayload;
}

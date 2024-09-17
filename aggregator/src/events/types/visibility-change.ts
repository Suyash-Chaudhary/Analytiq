import { Subjects, Visibility } from "./enums";
import { z } from "zod";

export const VisibilityChangeEventPayloadSchema = z.object({
  subject: z.literal(Subjects.VisibilityChange),
  data: z.object({
    records: z.array(
      z.object({
        id: z.string().uuid(),
        ip: z.string().ip(),
        domain: z.string(),
        subdomain: z.string(),
        visibility: z.nativeEnum(Visibility),
        timeStamp: z.number(),
      })
    ),
  }),
});

interface VisibilityChangeEventRecord {
  domain: string;
  subdomain: string;
  id: string;
  ip: string;
  visibility: Visibility;
  timeStamp: number;
}

interface VisibilityChangeEventPayload {
  subject: Subjects.VisibilityChange;
  data: { records: VisibilityChangeEventRecord[] };
}

export interface VisibilityChangeEvent {
  subject: Subjects.VisibilityChange;
  record: VisibilityChangeEventRecord;
  payload: VisibilityChangeEventPayload;
}

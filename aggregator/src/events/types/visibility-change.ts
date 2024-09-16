import { Subjects } from "./subjects";
import { z } from "zod";

export const VisibilityChangeEventPayloadSchema = z.object({
  subject: z.literal(Subjects.VisibilityChange),
  data: z.object({
    records: z.array(
      z.object({
        id: z.string().uuid(),
        ip: z.string().ip(),
        visibility: z.enum(["hidden", "visible"]),
        timeStamp: z.number(),
      })
    ),
  }),
});

interface VisibilityChangeEventRecord {
  id: string;
  ip: string;
  visibility: "hidden" | "visible";
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

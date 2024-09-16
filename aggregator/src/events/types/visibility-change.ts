import { Subjects } from "./subjects";

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

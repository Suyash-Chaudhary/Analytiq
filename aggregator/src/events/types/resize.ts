import { Subjects } from "./subjects";

interface ResizeEventRecord {
  id: string;
  ip: string;
  width: number;
  height: number;
  timeStamp: number;
}

interface ResizeEventPayload {
  subject: Subjects.Resize;
  data: { records: ResizeEventRecord[] };
}

export interface ResizeEvent {
  subject: Subjects.Resize;
  record: ResizeEventRecord;
  payload: ResizeEventPayload;
}

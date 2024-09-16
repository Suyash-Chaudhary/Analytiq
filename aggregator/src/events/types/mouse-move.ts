import { Subjects } from "./subjects";

interface MouseMoveEventRecord {
  id: string;
  ip: string;
  x: number;
  y: number;
  timeStamp: number;
}

interface MouseMoveEventPayload {
  subject: Subjects.MouseMove;
  data: { records: MouseMoveEventRecord[] };
}

export interface MouseMoveEvent {
  subject: Subjects.MouseMove;
  record: MouseMoveEventRecord;
  payload: MouseMoveEventPayload;
}
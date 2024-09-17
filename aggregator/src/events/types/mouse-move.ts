import { Subjects } from "./enums";

interface MouseMoveEventRecord {
  domain: string;
  subdomain: string;
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

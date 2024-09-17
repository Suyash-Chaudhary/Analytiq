import { Subjects } from "./enums";

interface ScrollEventRecord {
  domain: string;
  subdomain: string;
  id: string;
  ip: string;
  x: number;
  y: number;
  timeStamp: number;
}

interface ScrollEventPayload {
  subject: Subjects.Scroll;
  data: { records: ScrollEventRecord[] };
}

export interface ScrollEvent {
  subject: Subjects.Scroll;
  record: ScrollEventRecord;
  payload: ScrollEventPayload;
}

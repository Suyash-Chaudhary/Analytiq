import { Subjects } from "../subjects";

interface VisitorScrollEventRecord {
  domain: string;
  subdomain: string;
  id: string;
  ip: string;
  x: number;
  y: number;
  timeStamp: number;
}

interface VisitorScrollEventPayload {
  subject: Subjects.VisitorScroll;
  data: { records: VisitorScrollEventRecord[] };
}

export interface VisitorScrollEvent {
  subject: Subjects.VisitorScroll;
  record: VisitorScrollEventRecord;
  data: VisitorScrollEventPayload;
}

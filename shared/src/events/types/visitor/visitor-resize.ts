import { Subjects } from "../../subjects";

interface VisitorResizeEventRecord {
  domain: string;
  subdomain: string;
  id: string;
  ip: string;
  width: number;
  height: number;
  timeStamp: number;
}

interface VisitorResizeEventPayload {
  subject: Subjects.VisitorResize;
  data: { records: VisitorResizeEventRecord[] };
}

export interface VisitorResizeEvent {
  subject: Subjects.VisitorResize;
  record: VisitorResizeEventRecord;
  data: VisitorResizeEventPayload;
}

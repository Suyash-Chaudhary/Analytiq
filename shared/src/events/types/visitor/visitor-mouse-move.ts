import { Subjects } from "../../subjects";

interface VisitorMouseMoveEventRecord {
  domain: string;
  subdomain: string;
  id: string;
  ip: string;
  x: number;
  y: number;
  timeStamp: number;
}

interface VisitorMouseMoveEventPayload {
  subject: Subjects.VisitorMouseMove;
  data: { records: VisitorMouseMoveEventRecord[] };
}

export interface VisitorMouseMoveEvent {
  subject: Subjects.VisitorMouseMove;
  record: VisitorMouseMoveEventRecord;
  data: VisitorMouseMoveEventPayload;
}

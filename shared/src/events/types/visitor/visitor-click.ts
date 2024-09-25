import { Subjects } from "../../subjects";

interface VisitorMouseClickEventRecord {
  domain: string;
  subdomain: string;
  id: string;
  ip: string;
  x: number;
  y: number;
  timeStamp: number;
}

interface VisitorMouseClickEventPayload {
  subject: Subjects.VisitorMouseClick;
  data: { records: VisitorMouseClickEventRecord[] };
}

export interface VisitorMouseClickEvent {
  subject: Subjects.VisitorMouseClick;
  record: VisitorMouseClickEventRecord;
  data: VisitorMouseClickEventPayload;
}

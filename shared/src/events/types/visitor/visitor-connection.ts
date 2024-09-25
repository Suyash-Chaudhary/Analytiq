import { Subjects } from "../../subjects";

interface VisitorConnectionRecord {
  ip: string;
  id: string;
  html: string;
  domain: string;
  subdomain: string;
  page: string;
  timeStamp: number;
}

interface VisitorConnectionPayload {
  subject: Subjects.VisitorConnection;
  data: VisitorConnectionRecord;
}

export interface VisitorConnectionEvent {
  subject: Subjects.VisitorConnection;
  record: VisitorConnectionRecord;
  data: VisitorConnectionPayload;
}

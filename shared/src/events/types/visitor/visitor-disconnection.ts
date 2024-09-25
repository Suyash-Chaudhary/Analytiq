import { Subjects } from "../../subjects";

interface VisitorDisconnectionRecord {
  ip: string;
  id: string;
  domain: string;
  subdomain: string;
  timeStamp: number;
}

interface VisitorDisconnectionPayload {
  subject: Subjects.VisitorDisconnection;
  data: VisitorDisconnectionRecord;
}

export interface VisitorDisconnectionEvent {
  subject: Subjects.VisitorDisconnection;
  record: VisitorDisconnectionRecord;
  data: VisitorDisconnectionPayload;
}

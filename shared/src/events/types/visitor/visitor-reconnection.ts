import { Subjects } from "../../subjects";

interface VisitorReconnectionEventRecord {
  ip: string;
  id: string;
  html: string;
  domain: string;
  subdomain: string;
  page: string;
  startTimeStamp: number;
  timeStamp: number;
}

interface VisitorReconnectionEventPayload {
  subject: Subjects.VisitorReconnection;
  data: VisitorReconnectionEventRecord;
}

export interface VisitorReconnectionEvent {
  subject: Subjects.VisitorReconnection;
  record: VisitorReconnectionEventRecord;
  data: VisitorReconnectionEventPayload;
}

import { Subjects } from "./subjects";

interface ConnectionEventRecord {
  ip: string;
  id: string;
  html: string;
  domain: string;
  subdomain: string;
  page: string;
  timeStamp: number;
}

interface ConnectionEventPayload {
  subject: Subjects.Connection;
  data: ConnectionEventRecord;
}

export interface ConnectionEvent {
  subject: Subjects.Connection;
  record: ConnectionEventRecord;
  payload: ConnectionEventPayload;
}

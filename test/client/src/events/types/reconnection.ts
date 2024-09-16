import { Subjects } from "./subjects";

interface ReconnectionEventRecord {
  ip: string;
  id: string;
  html: string;
  domain: string;
  subdomain: string;
  page: string;
  timeStamp: number;
}

interface ReconnectionEventPayload {
  subject: Subjects.Reconnection;
  data: ReconnectionEventRecord;
}

export interface ReconnectionEvent {
  subject: Subjects.Reconnection;
  record: ReconnectionEventRecord;
  payload: ReconnectionEventPayload;
}

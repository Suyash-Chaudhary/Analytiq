import { Subjects } from "./enums";

interface ClickEventRecord {
  domain: string;
  subdomain: string;
  id: string;
  ip: string;
  x: number;
  y: number;
  timeStamp: number;
}

interface ClickEventPayload {
  subject: Subjects.MouseClick;
  data: { record: ClickEventRecord[] };
}

export interface ClickEvent {
  subject: Subjects.MouseClick;
  record: ClickEventRecord;
  payload: ClickEventPayload;
}

import { Subjects } from "../../subjects";

interface VisitorNavigationEventRecord {
  domain: string;
  subdomain: string;
  id: string;
  ip: string;
  page: string;
  html: string;
  timeStamp: number;
}

interface VisitorNavigationEventPayload {
  subject: Subjects.VisitorNavigation;
  data: { records: VisitorNavigationEventRecord[] };
}

export interface VisitorNavigationEvent {
  subject: Subjects.VisitorNavigation;
  record: VisitorNavigationEventRecord;
  data: VisitorNavigationEventPayload;
}

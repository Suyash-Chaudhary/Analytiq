import { Subjects } from "./subjects";

interface NavigationEventRecord {
  id: string;
  ip: string;
  page: string;
  html: string;
  timeStamp: number;
}

interface NavigationEventPayload {
  subject: Subjects.Navigation;
  data: { records: NavigationEventRecord[] };
}

export interface NavigationEvent {
  subject: Subjects.Navigation;
  record: NavigationEventRecord;
  payload: NavigationEventPayload;
}

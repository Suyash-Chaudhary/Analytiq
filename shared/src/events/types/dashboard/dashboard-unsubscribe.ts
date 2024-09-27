import { Subjects } from "../../subjects";

interface DashboardUnsubscribeEventRecord {
  domain: string;
}

interface DashboardUnsubscribeEventRecord {
  domain: string;
}

interface DashboardUnsubscribeEventPayload {
  subject: Subjects.DashboardUnsubscribe;
  data: DashboardUnsubscribeEventRecord;
}

export interface DashboardUnsubscribeEvent {
  subject: Subjects.DashboardUnsubscribe;
  record: DashboardUnsubscribeEventRecord;
  data: DashboardUnsubscribeEventPayload;
}

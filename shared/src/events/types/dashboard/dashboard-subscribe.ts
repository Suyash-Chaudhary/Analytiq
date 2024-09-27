import { Subjects } from "../../subjects";

interface DashboardSubscribeEventRecord {
  domain: string;
}

interface DashboardUnsubscribeEventRecord {
  domain: string;
}

interface DashboardSubscribeEventPayload {
  subject: Subjects.DashboardSubscribe;
  data: DashboardSubscribeEventRecord;
}

export interface DashboardSubscribeEvent {
  subject: Subjects.DashboardSubscribe;
  record: DashboardUnsubscribeEventRecord;
  data: DashboardSubscribeEventPayload;
}

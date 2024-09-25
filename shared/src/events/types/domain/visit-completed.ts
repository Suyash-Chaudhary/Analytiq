import { Subjects } from "../../subjects";

interface DomainVisitCompletedEventRecord {
  domain: string;
  subdomain: string;
  id: string;
  ip: string;
  timeStamp: number;
}

interface DomainVisitCompletedEventPayload {
  subject: Subjects.DomainVisitCompleted;
  data: DomainVisitCompletedEventRecord;
}

export interface DomainVisitCompletedEvent {
  subject: Subjects.DomainVisitCompleted;
  record: DomainVisitCompletedEventRecord;
  data: DomainVisitCompletedEventPayload;
}

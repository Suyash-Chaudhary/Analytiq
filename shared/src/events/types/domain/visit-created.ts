import { Subjects } from "../../subjects";
import { Visibility } from "../../visibility";
import { IDomainEventLocation, IDomainEventSession } from "./types";

interface DomainVisitCreatedEventRecord {
  id: string;
  domain: string;
  subdomain: string;
  ip: string;
  location: IDomainEventLocation;
  startTime: number;
  page: string;
  visibility: Visibility;
  query: string;
  sessions: IDomainEventSession[];
}

interface DomainVisitCreatedEventPayload {
  subject: Subjects.DomainVisitCreated;
  data: DomainVisitCreatedEventRecord;
}

export interface DomainVisitCreatedEvent {
  subject: Subjects.DomainVisitCreated;
  record: DomainVisitCreatedEventRecord;
  data: DomainVisitCreatedEventPayload;
}

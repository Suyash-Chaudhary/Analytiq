import { Subjects } from "../../subjects";
import { Visibility } from "../../visibility";
import { IDomainEventLocation, IDomainEventSession } from "./types";

interface DomainVisitUpdatedEventRecord {
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

interface DomainVisitUpdatedEventPayload {
  subject: Subjects.DomainVisitUpdated;
  data: DomainVisitUpdatedEventRecord;
}

export interface DomainVisitUpdatedEvent {
  subject: Subjects.DomainVisitUpdated;
  record: DomainVisitUpdatedEventRecord;
  data: DomainVisitUpdatedEventPayload;
}

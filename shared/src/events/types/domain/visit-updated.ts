import { Subjects } from "../../subjects";
import { Visibility } from "../../visibility";

interface ILocation {
  country: string;
  region: string;
  city: string;
  ll: [number, number];
  metro: number;
  zip: number;
}

interface IVisibility {
  visibility: Visibility;
  timeStamp: number;
}

interface ISession {
  page: string;
  query: string;
  startTime: number;
  visibility: IVisibility[];
}

interface DomainVisitUpdatedEventRecord {
  vid: string;
  domain: string;
  subdomain: string;
  ipv4: string;
  location: ILocation;
  startTime: number;
  page: string;
  visibility: Visibility;
  query: string;
  sessions: ISession[];
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

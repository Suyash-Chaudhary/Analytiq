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

interface DomainVisitCreatedEventRecord {
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

interface DomainVisitCreatedEventPayload {
  subject: Subjects.DomainVisitCreated;
  data: DomainVisitCreatedEventRecord;
}

export interface DomainVisitCreatedEvent {
  subject: Subjects.DomainVisitCreated;
  record: DomainVisitCreatedEventRecord;
  data: DomainVisitCreatedEventPayload;
}

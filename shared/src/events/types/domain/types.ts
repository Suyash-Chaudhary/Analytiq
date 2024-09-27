import { Visibility } from "../../visibility";

export interface IDomainEventLocation {
  country: string;
  region: string;
  city: string;
  ll: [number, number];
  metro: number;
  zip: number;
}

export interface IDomainEventVisibility {
  visibility: Visibility;
  timeStamp: number;
}

export interface IDomainEventSession {
  page: string;
  query: string;
  startTime: number;
  visibility: IDomainEventVisibility[];
}

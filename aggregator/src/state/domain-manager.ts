import { Visibility } from "../events/types/enums";

export interface ILocation {
  country: string;
  region: string;
  city: string;
  ll: [number, number];
  metro: number;
  zip: number;
}

export interface IVisibility {
  visibility: Visibility;
  timeStamp: number;
}

export interface ISession {
  page: string;
  query: string;
  startTime: number;
  endTime?: number;
  visibility: IVisibility[];
}

export interface IVisit {
  vid: string;
  domain: string;
  subdomain: string;
  ipv4: string;
  location?: ILocation;
  startTime: number;
  page: string;
  visibility: Visibility;
  query: string;
  sessions: ISession[];
}

export interface IVisits {
  // { vid: Visit }
  [key: string]: IVisit;
}

export interface ISubDomains {
  // { subdomain: Visits }
  [key: string]: IVisits;
}

export interface IDomains {
  // { domain: SubDomains }
  [key: string]: ISubDomains;
}

class DomainManager {
  // Singleton Class Implementation
  private constructor() {}
  private static _instance: DomainManager | null = null;
  static initialize() {
    if (!this._instance) this._instance = new DomainManager();
  }

  static addVisit(
    domain: string,
    subdomain: string,
    ip: string,
    vid: string,
    timeStamp: number,
    page: string
  ) {
    if (!this._instance)
      throw new Error(
        `DomainManager must be initialized before calling addVisit. Try calling the initialize() method during server setup`
      );
    return this._instance._addVisit(
      domain,
      subdomain,
      ip,
      vid,
      timeStamp,
      page
    );
  }

  static removeVisit(domain: string, subdomain: string, vid: string) {
    if (!this._instance)
      throw new Error(
        `DomainManager must be initialized before calling removeVisit. Try calling the initialize() method during server setup`
      );
    this._instance._removeVisit(domain, subdomain, vid);
  }

  static updateUrl(
    domain: string,
    subdomain: string,
    vid: string,
    timeStamp: number,
    url: string
  ) {
    if (!this._instance)
      throw new Error(
        `DomainManager must be initialized before calling updateUrl. Try calling the initialize() method during server setup`
      );
    return this._instance._updateUrl(domain, subdomain, vid, timeStamp, url);
  }

  static updateVisibility(
    domain: string,
    subdomain: string,
    vid: string,
    timeStamp: number,
    visibility: Visibility
  ) {
    if (!this._instance)
      throw new Error(
        `DomainManager must be initialized before calling updateVisibility. Try calling the initialize() method during server setup`
      );
    return this._instance._updateVisibility(
      domain,
      subdomain,
      vid,
      timeStamp,
      visibility
    );
  }

  // End of Singleton Class methods

  // Instance implementation
  private _domains: IDomains = {};

  private _addVisit(
    domain: string,
    subdomain: string,
    ip: string,
    vid: string,
    timeStamp: number,
    page: string
  ) {
    if (!this._domains[domain]) this._domains[domain] = {};
    if (!this._domains[domain][subdomain])
      this._domains[domain][subdomain] = {};

    const visit: IVisit = {
      vid: vid,
      domain: domain,
      subdomain: subdomain,
      ipv4: ip,
      startTime: timeStamp,
      page: page,
      visibility: Visibility.Visible,
      query: "",
      sessions: [
        {
          page: page,
          query: "",
          startTime: timeStamp,
          visibility: [
            {
              visibility: Visibility.Visible,
              timeStamp: timeStamp,
            },
          ],
        },
      ],
    };

    this._domains[domain][subdomain][visit.vid] = visit;
    return visit;
  }

  private _removeVisit(domain: string, subdomain: string, vid: string) {
    if (this._domains[domain]?.[subdomain]?.[vid])
      delete this._domains[domain][subdomain][vid];
  }

  private _updateUrl(
    domain: string,
    subdomain: string,
    vid: string,
    timeStamp: number,
    page: string
  ) {
    const visit = this._domains[domain]?.[subdomain]?.[vid];
    if (visit && visit.page !== page) {
      visit.sessions.at(-1)!.endTime = timeStamp;
      visit.sessions.push({
        page: page,
        query: "",
        startTime: timeStamp,
        visibility: [
          {
            visibility: visit.visibility,
            timeStamp: timeStamp,
          },
        ],
      });
      visit.page = page;
    }
    return visit;
  }

  private _updateVisibility(
    domain: string,
    subdomain: string,
    vid: string,
    timeStamp: number,
    visibility: Visibility
  ) {
    const visit = this._domains[domain]?.[subdomain]?.[vid];
    if (visit) {
      visit.visibility = visibility;
      visit.sessions.at(-1)!.visibility.push({
        visibility: visibility,
        timeStamp: timeStamp,
      });
    }

    return visit;
  }
}

DomainManager.initialize();

export default DomainManager;

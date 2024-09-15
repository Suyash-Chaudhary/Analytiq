interface ILocation {
  country: string;
  region: string;
  city: string;
  ll: [number, number];
  metro: number;
  zip: number;
}

interface IVisit {
  vid: string;
  domain: string;
  subdomain: string;
  ipv4: string;
  location?: ILocation;
  startTime: Date;
  page: string;
  query: { [key: string]: string };
  sessions: Date[];
}

interface ISubDomain {
  [key: string]: IVisit;
}

interface IDomain {
  [key: string]: ISubDomain;
}

class DomainManager {
  // Singleton Class Implementation
  private constructor() {}
  private static _instance: DomainManager | null = null;
  static initialize() {
    if (!this._instance) this._instance = new DomainManager();
  }

  static addVisit(domain: string, subdomain: string, visit: IVisit) {
    if (!this._instance)
      throw new Error(
        `DomainManager must be initialized before calling addVisit. Try calling the initialize() method during server setup`
      );
    this._instance._addVisit(domain, subdomain, visit);
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
    url: string
  ) {
    if (!this._instance)
      throw new Error(
        `DomainManager must be initialized before calling updateUrl. Try calling the initialize() method during server setup`
      );
    this._instance._udpdateUrl(domain, subdomain, vid, url);
  }

  static startSession(
    domain: string,
    subdomain: string,
    vid: string,
    timestamp: Date
  ) {
    if (!this._instance)
      throw new Error(
        `DomainManager must be initialized before calling startSession. Try calling the initialize() method during server setup`
      );
    this._instance._startSession(domain, subdomain, vid, timestamp);
  }

  static closeSession(
    domain: string,
    subdomain: string,
    vid: string,
    timestamp: Date
  ) {
    if (!this._instance)
      throw new Error(
        `DomainManager must be initialized before calling closeSession. Try calling the initialize() method during server setup`
      );
    this._instance._closeSession(domain, subdomain, vid, timestamp);
  }
  // End of Singleton Class methods

  // Instance implementation
  private _domains: { [key: string]: IDomain } = {};

  private _addVisit(domain: string, subdomain: string, visit: IVisit) {
    if (!this._domains[domain]) this._domains[domain] = {};
    if (!this._domains[domain][subdomain])
      this._domains[domain][subdomain] = {};
    this._domains[domain][subdomain][visit.vid] = visit;
  }

  private _removeVisit(domain: string, subdomain: string, vid: string) {
    if (this._domains[domain]?.[subdomain]?.[vid])
      delete this._domains[domain][subdomain][vid];
  }

  private _udpdateUrl(
    domain: string,
    subdomain: string,
    vid: string,
    url: string
  ) {
    if (this._domains[domain]?.[subdomain]?.[vid])
      this._domains[domain][subdomain][vid].page = url;
  }

  private _startSession(
    domain: string,
    subdomain: string,
    vid: string,
    timestamp: Date
  ) {
    if (this._domains[domain]?.[subdomain]?.[vid])
      this._domains[domain]?.[subdomain]?.[vid].sessions.push(timestamp);
  }

  private _closeSession(
    domain: string,
    subdomain: string,
    vid: string,
    timestamp: Date
  ) {
    if (this._domains[domain]?.[subdomain]?.[vid])
      this._domains[domain]?.[subdomain]?.[vid].sessions.push(timestamp);
  }
}

export default DomainManager;

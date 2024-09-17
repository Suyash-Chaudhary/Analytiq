import detectBrowser from "../utils/detect-browser";
import getIp from "../utils/get-ip";
import getMetaData from "../utils/get-metadata";
import short from "short-uuid";

class GlobalState {
  // Single instance
  private static _instance: GlobalState | null = null;
  private constructor(id: string, ip: string) {
    this.id = id;
    this.ip = ip;
    this.browser = detectBrowser();
    [this.domain] = getMetaData();
    this.subdomain = window.location.hostname;
    this.page = window.location.hostname + window.location.pathname;
    this.firstLoad = true;
    this.reconnectAttempts = 0;
  }
  static async initialize() {
    const id = short.uuid();
    const ip = await getIp();
    this._instance = new GlobalState(id, ip);
  }

  static instance() {
    if (!this._instance)
      throw new Error(
        "GlobalState must be initialized before accessing it's instance"
      );
    return this._instance;
  }

  browser: string;
  domain: string;
  subdomain: string;
  page: string;
  firstLoad: boolean;
  reconnectAttempts: number;
  eventBufferTimeout?: number;
  ip: string;
  id: string;
}

export default GlobalState;

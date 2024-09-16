import bufferedEvents from "./utils/buffered-events";
import detectBrowser from "./utils/detect-browser";
import getMetaData from "./utils/get-metadata";

class GlobalState {
  // Single instance
  private static _instance: GlobalState | null = null;
  private constructor() {
    this.browser = detectBrowser();
    [this.domain] = getMetaData();
    this.subdomain = window.location.hostname;
    this.page = window.location.hostname + window.location.pathname;
    this.firstLoad = true;
    this.reconnectAttempts = 0;
    [this.addEvent, this.sendEvents] = bufferedEvents();
  }
  static instance() {
    if (!this._instance) this._instance = new GlobalState();
    return this._instance;
  }

  browser: string;
  domain: string;
  subdomain: string;
  page: string;
  firstLoad: boolean;
  reconnectAttempts: number;
  eventBufferTimeout?: number;
  ip?: string;
  id?: string;
  addEvent: (event: any) => void;
  sendEvents: (socket: WebSocket) => Promise<void>;
}

GlobalState.instance();

export default GlobalState;

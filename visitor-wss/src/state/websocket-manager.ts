import { WebSocket } from "ws";

interface IWebSocket {
  domain: string;
  subdomain: string;
  ip: string;
  id: string;
  timeStamp: number;
  start: number;
}

export class WebsocketManager {
  // Static methods
  private static _instance: WebsocketManager;
  static initialize() {
    if (!this._instance) this._instance = new WebsocketManager();
  }
  static get instance() {
    if (!this.instance)
      throw new Error(
        "WebsocketManager must be initalized before accessing instance"
      );
    return this._instance;
  }

  static add(
    socket: WebSocket,
    data: {
      domain: string;
      subdomain: string;
      ip: string;
      id: string;
      timeStamp: number;
    }
  ) {
    return this._instance._add(socket, data);
  }

  static remove(socket: WebSocket) {
    return this._instance._remove(socket);
  }

  // Instance methods
  private constructor() {
    this._map = new Map<WebSocket, IWebSocket>();
  }
  private _map: Map<WebSocket, IWebSocket>;

  private _add(
    socket: WebSocket,
    data: {
      domain: string;
      subdomain: string;
      ip: string;
      id: string;
      timeStamp: number;
    }
  ) {
    this._map.set(socket, {
      domain: data.domain,
      subdomain: data.subdomain,
      ip: data.ip,
      id: data.id,
      timeStamp: data.timeStamp,
      start: Date.now(),
    });
  }

  private _remove(socket: WebSocket) {
    const data = this._map.get(socket);
    if (!data) throw new Error("Socket not found in state");
    if (!this._map.delete(socket)) throw new Error("Couldn't delete socket");
    return {
      id: data.id,
      ip: data.ip,
      domain: data.domain,
      subdomain: data.subdomain,
      timeStamp: data.timeStamp + Date.now() - data.start,
    };
  }
}

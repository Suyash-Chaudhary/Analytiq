import { DomainEvent } from "@analytiq/shared";
import { WebSocket } from "ws";
import { SubscriptionManager } from "./subscription-manager";

export class WebsocketManager {
  // Singleton implementation
  private constructor() {}
  private static _instance: WebsocketManager | null = null;
  static initialize() {
    if (!this._instance) this._instance = new WebsocketManager();
  }

  static async resgisterSocketToDomain(socket: WebSocket, domain: string) {
    if (!this._instance)
      throw new Error(
        "WebsocketManager must be initialized before calling resgisterSocketToDomain()"
      );
    return this._instance._resgisterSocketToDomain(socket, domain);
  }

  static forwardDomainEventToSockets(
    payload: DomainEvent["data"],
    domain: string
  ) {
    if (!this._instance)
      throw new Error(
        "WebsocketManager must be initialized before calling forwardDomainEventToSockets()"
      );
    return this._instance._forwardDomainEventToSockets(payload, domain);
  }

  static async unregisterSocketFromDomain(socket: WebSocket, domain: string) {
    if (!this._instance)
      throw new Error(
        "WebsocketManager must be initialized before calling unregisterSocketFromDomain()"
      );
    return this._instance._unregisterSocketFromDomain(socket, domain);
  }

  // Instance implementation
  private _domains: Map<String, Set<WebSocket>>;

  private async _resgisterSocketToDomain(socket: WebSocket, domain: string) {
    let sockets = this._domains.get(domain);
    if (!sockets) {
      await SubscriptionManager.verifySubscription(domain);
      sockets = new Set();
      this._domains.set(domain, sockets);
    }
    sockets.add(socket);
  }

  private async _unregisterSocketFromDomain(socket: WebSocket, domain: string) {
    const sockets = this._domains.get(domain);
    if (!sockets) return;
    sockets.delete(socket);
    if (sockets.size === 0)
      await SubscriptionManager.removeSubscription(domain);
  }

  private _forwardDomainEventToSockets(
    payload: DomainEvent["data"],
    domain: string
  ) {
    const sockets = this._domains.get(domain);
    if (!sockets) return;
    sockets.forEach((socket) => {
      if (socket.CLOSED || socket.CLOSING) sockets.delete(socket);
      else socket.send(JSON.stringify(payload));
    });
  }
}

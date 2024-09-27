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
    if (!this._domains.has(domain)) {
      await SubscriptionManager.verifySubscription(domain);
      this._domains.set(domain, new Set());
    }
    this._domains.get(domain)!.add(socket);
  }

  private async _unregisterSocketFromDomain(socket: WebSocket, domain: string) {
    if (!this._domains.has(domain)) return;
    this._domains.get(domain)!.delete(socket);
    if (this._domains.get(domain)!.size === 0)
      await SubscriptionManager.removeSubscription(domain);
  }

  private _forwardDomainEventToSockets(
    payload: DomainEvent["data"],
    domain: string
  ) {
    if (!this._domains.has(domain)) return;
    this._domains.get(domain)!.forEach((socket) => {
      socket.send(JSON.stringify(payload));
    });
  }
}

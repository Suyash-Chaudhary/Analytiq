import { RedisClient } from "@analytiq/shared";
import { DomainEventSubscriber } from "../events/subscribers/domain";

export class SubscriptionManager {
  // Singleton implementation
  private constructor() {}
  private static _instance: SubscriptionManager | null = null;
  static initialize() {
    if (!this._instance) this._instance = new SubscriptionManager();
  }

  static async verifySubscription(domain: string) {
    if (!this._instance)
      throw new Error(
        "SubscriptionManager must be initialized before calling verifySubscription()"
      );
    return this._instance._verifySubscription(domain);
  }

  static async removeSubscription(domain: string) {
    if (!this._instance)
      throw new Error(
        "SubscriptionManager must be initialized before calling removeSubscription()"
      );
    return this._instance._removeSubscription(domain);
  }

  // Instance implementation
  // { domain: DomainEventSubsriber }
  private _subscriptions: Map<string, DomainEventSubscriber>;

  private async _verifySubscription(domain: string) {
    if (!this._subscriptions.has(domain)) {
      const subcription = new DomainEventSubscriber(domain);
      await subcription.subscribe(RedisClient.client());
      this._subscriptions.set(domain, subcription);
    }
  }

  private async _removeSubscription(domain: string) {
    await this._subscriptions.get(domain)?.unsubscribe(RedisClient.client());
    this._subscriptions.delete(domain);
  }
}

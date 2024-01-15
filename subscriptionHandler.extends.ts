import { Injectable, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

/**
 * Destroy subscriptions and provides a convenient way to clean them up when needed.
 * Note: HttpClient subscription are not needed. Use in obervables, subjects, BehaviorSubjects, ...
 *
 * @example
 * ```typescript
 * import { SubscriptionManager } from './subscription-manager';
 * export class ExampleComponent extends SubscriptionManager implements OnDestroy {
 *
 *   constructor() {
 *     super(); // !IMPORTANT: Call the constructor of the base class
 *
 *     // Example subscription
 *     this.addSubscription(this.yourSubscription.suubscribe(...));
 *   }
 * }
 * ```
 *
 * @remarks
 * This class is decorated with `@Injectable` to allow Angular to manage its dependencies.
 */

@Injectable({
  providedIn: 'root', // or provide it in a specific module if needed
})
export class SubscriptionHandler implements OnDestroy {
  private $subscriptions: Subscription[] = [];

  /**
   * Add a subscription to the manager.
   * @param subscription The subscription to be added.
   */
  addSubscription(subscription: Subscription): void {
    this.$subscriptions.push(subscription);
  }

  /**
   * Implement the OnDestroy lifecycle hook to unsubscribe from all subscriptions.
   */
  ngOnDestroy(): void {
    this.$subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}

import { OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Base } from './base';

type Constructor<T = {}> = new (...args: any[]) => T;

export function Disposable<TBase extends Constructor>(Target?: TBase) {
   return class extends Base(Target) implements OnDestroy {
      private _subscriptions: Array<Subscription> = [];

      constructor(...args: any[]) {
         super(...args);
      }

      ngOnDestroy() {
         this._subscriptions.forEach(a => a.unsubscribe());
      }

      register(subscription: Subscription) {
         this._subscriptions.push(subscription);
      }
   }
}

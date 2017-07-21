import { OnChanges, SimpleChanges } from '@angular/core';
import { Base } from './base';

type Constructor<T = {}> = new (...args: any[]) => T;

interface Watcher {
   propertyName: string;
   fn: (newValue: any, oldValue: any) => void;
}

export function Watchable<TBase extends Constructor>(Target?: TBase) {
   class WatchableMixin extends Base(Target) implements OnChanges {
      private _watchers: Array<Watcher> = [];

      constructor(...args: any[]) {
         super(...args);
      }
      
      watch<T>(propertyName: string, fn: (newValue: T, oldValue: T) => void): void {
         this._watchers.push({ propertyName, fn });
      }
      
      ngOnChanges(changes: SimpleChanges) {
         this._watchers.forEach(({ propertyName, fn }) => {
            const change = changes[propertyName];

            if (change === undefined) {
               return;
            }

            fn(change.currentValue, change.previousValue);
         });
      }
   };

   return WatchableMixin;
}

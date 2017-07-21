import { Component, Input } from '@angular/core';
import { Disposable, Watchable } from '../../mixins';
import { AngularFireDatabase } from 'angularfire2/database';

/**
 * Generated class for the ChannelComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
   selector: 'channel',
   templateUrl: 'channel.html'
})
export class ChannelComponent extends Disposable(Watchable()) {

   @Input() channel: any;

   messages: Array<any>;

   constructor(private db: AngularFireDatabase) {
      super();

      this.watch('channel', this.onChannelChanged.bind(this));
   }

   onChannelChanged() {
      if (this.channel) {
         return;
      }

      const subscription = this.db.list(`/channels/${ this.channel.id }/messages`)
         .subscribe((messages) => {
            this.messages = messages;
         });

      this.register(subscription);
   }
}

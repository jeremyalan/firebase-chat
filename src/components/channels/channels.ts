import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { User } from 'firebase';
import { AngularFireDatabase } from 'angularfire2/database';

import { ChannelPage } from '../../pages/channel/channel';
import { AddChannelPage } from '../../pages/add-channel/add-channel';
import { Disposable, Watchable } from '../../mixins';

/**
 * Generated class for the ChannelsComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'channels',
  templateUrl: 'channels.html',
})
export class ChannelsComponent extends Disposable(Watchable()) implements OnInit {

   @Input() user: User;
   @Output() select = new EventEmitter<any>();

   channels: Array<any>;

   constructor(private db: AngularFireDatabase,
               private modal: ModalController) {
      super();
   }

   async addChannel() {
      if (this.user == null) {
         return;
      }

      const modal = this.modal.create(AddChannelPage);
      const result = await modal.present();

      this.select.emit(result);
   }

   ngOnInit() {
      this.watch('user', () => this.onUserChanged());
   }

   onUserChanged() {
      if (this.user == null) {
         return;
      }

      const subscription = this.db.list(`/users/${ this.user.uid }/channels`)
         .subscribe((channels) => {
            this.channels = channels;
         });

      this.register(subscription);
   }
}

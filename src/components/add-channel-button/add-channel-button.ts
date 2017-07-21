import { Component, Input, EventEmitter, Output } from '@angular/core';
import { User } from "firebase";
import { ModalController } from "ionic-angular";
import { AddChannelPage } from "../../pages/add-channel/add-channel";

/**
 * Generated class for the AddChannelButtonComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
   selector: 'add-channel-button',
   templateUrl: 'add-channel-button.html'
})
export class AddChannelButtonComponent {

   @Input() user: User;
   @Output() add: EventEmitter<any> = new EventEmitter();

   constructor(private modal: ModalController) {
   }

   addChannel() {
      if (this.user == null) {
         return;
      }

      const modal = this.modal.create(AddChannelPage);

      modal.onDidDismiss((channel) => {
         if (channel == null) {
            return;
         }

         this.add.emit(channel);
      });

      modal.present();
   }

}

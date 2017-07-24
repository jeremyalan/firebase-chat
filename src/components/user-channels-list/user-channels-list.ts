import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { AngularFireDatabase } from "angularfire2/database";
import { User } from "firebase/app";
import { Observable, BehaviorSubject } from "rxjs";

/**
 * Generated class for the UserChannelsListComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
   selector: 'user-channels-list',
   templateUrl: 'user-channels-list.html'
})
export class UserChannelsListComponent implements OnInit {

   @Input('user') user$: BehaviorSubject<User>;
   @Output() select = new EventEmitter<any>();

   channels$: Observable<any[]>;

   constructor(private db: AngularFireDatabase) {
   }

   ngOnInit() {
      this.channels$ = this.user$.asObservable()
         .filter(a => a != null)
         .switchMap(user => {
            return this.db.list(`/users/${ user.uid }/channels`);
         })
         .switchMap(userChannels => {
            const channels = userChannels.map(ref => this.db.object(`/channels/${ ref.$key }`));
            
            return Observable.zip(...channels);
         })
         .map((channels) => {
            const result = channels.slice(0);
            result.sort(UserChannelsListComponent.sortByChannelName);

            return result;
         });
   }

   static sortByChannelName(left: any, right: any) {
      const leftName = left.name;
      const rightName = right.name;

      if (leftName == null) {
         if (rightName == null) {
            return 0;
         }

         return +1;
      }

      if (rightName == null) {
         return -1;
      }

      if (leftName < rightName) {
         return -1;
      }

      if (rightName < leftName) {
         return +1;
      }

      return 0;
   }

}

import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { AngularFireDatabase } from "angularfire2/database";
import { User } from "firebase";
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
         });
   }

}

import { Component, Input, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable, BehaviorSubject } from "rxjs/Rx";
import { User } from "firebase/app";

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
export class ChannelComponent implements OnInit {

   @Input('channel') channel$: BehaviorSubject<any>;
   @Input('user') user$: BehaviorSubject<User>;

   text: string;

   messages$: Observable<any[]>;

   constructor(private db: AngularFireDatabase) {
   }

   ngOnInit() {
      this.messages$ = this.channel$.asObservable()
         .filter(a => a != null)
         .switchMap(channel => this.db.list(`/channels/${ channel.id }/messages`));
   }

   async send() {
      const channel = this.channel$.getValue().id;
      const user = this.user$.getValue().uid;

      await this.db.list(`/channels/${ channel }/messages`)
         .push({
            author: user,
            text: this.text
         });

      this.text = null;
   }
}

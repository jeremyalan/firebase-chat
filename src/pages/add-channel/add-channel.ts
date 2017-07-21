import { Component, OnInit, ViewRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ViewController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

/**
 * Generated class for the AddChannelPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
   selector: 'page-add-channel',
   templateUrl: 'add-channel.html',
})
export class AddChannelPage implements OnInit {

   channelSubjectStart: Subject<string>;
   channelSubjectEnd: Subject<string>;
   channels: FirebaseListObservable<any[]>;

   constructor(private db: AngularFireDatabase,
               private auth: AngularFireAuth,
               private viewCtrl: ViewController) {
   }

   ngOnInit() {
      this.channelSubjectStart = new BehaviorSubject(undefined);
      this.channelSubjectEnd = new BehaviorSubject(undefined);

      this.channels = this.db.list(`/channels`, {
         query: {
            orderByChild: 'name',
            startAt: this.channelSubjectStart,
            endAt: this.channelSubjectEnd
         }
      });
   }

   search($event) {
      if ($event.target.value) {
         this.channelSubjectStart.next($event.target.value || undefined);
         this.channelSubjectEnd.next($event.target.value + 'z');
      }
      else {
         this.channelSubjectStart.next(undefined);
         this.channelSubjectEnd.next(undefined);
      }
      
   }

   async create(channelName: string) {
      const user = this.auth.auth.currentUser;

      if (user == null) {
         return;
      }

      const channelRef = this.db.list(`/channels`)
         .push({
            name: channelName,
            users: {
               [user.uid]: {}
            }
         });
      await channelRef;

      await this.db.list(`/channels/${ channelRef.key }`)
         .update(channelRef.key, { id: channelRef.key });

      await this.select(channel);
   }

   async select(channel: any) {
      const user = this.auth.auth.currentUser;

      if (user == null) {
         return;
      }

      await this.db.list(`/users/${ user.uid }/channels`)
         .update(channel.id, { active: true });
      await this.db.list(`/channels/${ channel.id }/users`)
         .update(user.uid, { active: true });

      await this.db.object(`/channels/${ channel.id }`)
         .do((channel) => { this.viewCtrl.dismiss(channel) });
   }
}

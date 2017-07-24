import { Component, OnInit } from '@angular/core';
import { ViewController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import 'rxjs/add/operator/do';
import 'rxjs/add/operator/first';

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

      await this.db.database.ref(`/channels/${ channelRef.key }`)
         .update({ id: channelRef.key });

      await this.select(channelRef.key);
   }

   async select(id: string) {
      const user = this.auth.auth.currentUser;

      if (user == null) {
         return;
      }

      await this.db.database.ref(`/users/${ user.uid }/channels/${ id }`)
         .update({ active: true });

      await this.db.database.ref(`/channels/${ id }/users/${ user.uid }`)
         .update({ active: true })

      this.db.object(`/channels/${ id }`)
         .first()
         .subscribe(channel => this.viewCtrl.dismiss(channel));
   }

   cancel() {
      this.viewCtrl.dismiss(null);
   }
}

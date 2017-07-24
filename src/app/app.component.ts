import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AngularFireAuth } from 'angularfire2/auth';

import { ChannelPage } from '../pages/channel/channel';
import { Observable, Subscriber, BehaviorSubject } from "rxjs/Rx";
import { User } from "firebase";
import { AngularFireDatabase } from "angularfire2/database";

@Component({
   templateUrl: 'app.html',
   providers: [AngularFireAuth]
})
export class MyApp {
   @ViewChild(Nav) nav: Nav;

   channelSubject: BehaviorSubject<any>;
   userSubject: BehaviorSubject<User>;

   constructor(public platform: Platform,
               public statusBar: StatusBar,
               public splashScreen: SplashScreen,
               public auth: AngularFireAuth,
               public db: AngularFireDatabase,
               public storage: Storage) {
      this.initializeApp();
   }

   initializeApp() {
      this.platform.ready().then(() => {
         // Okay, so the platform is ready and our plugins are available.
         // Here you can do any higher level native things you might need.
         this.statusBar.styleDefault();
         this.splashScreen.hide();

         this.nav.setRoot(ChannelPage, { channel: this.channelSubject, user: this.userSubject });

         this.getInitialChannel();
      });

      this.channelSubject = new BehaviorSubject(null);
      this.userSubject = new BehaviorSubject(null);
      
      this.auth.auth.signInAnonymously();

      this.auth.authState.subscribe((user) => {
         this.userSubject.next(user);
      });
   }

   async getInitialChannel() {
      const channelId = await this.storage.get('mostRecentChannel');

      if (channelId == null) {
         return;
      }

      this.db.object(`channels/${ channelId }`)
         .first()
         .subscribe(channel => this.goToChannel(channel));
   }

   goToChannel(channel: any) {
      if (channel == null) {
         return;
      }

      this.storage.set('mostRecentChannel', channel.id);
      this.channelSubject.next(channel);
   }
}

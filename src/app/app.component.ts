import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AngularFireAuth } from 'angularfire2/auth';

import { HomePage } from '../pages/home/home';
import { ChannelPage } from '../pages/channel/channel';
import { Observable, Subscriber, BehaviorSubject } from "rxjs/Rx";
import { User } from "firebase";

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
               public auth: AngularFireAuth) {
      this.initializeApp();
   }

   initializeApp() {
      this.platform.ready().then(() => {
         // Okay, so the platform is ready and our plugins are available.
         // Here you can do any higher level native things you might need.
         this.statusBar.styleDefault();
         this.splashScreen.hide();

         this.nav.setRoot(ChannelPage, { channel: this.channelSubject, user: this.userSubject });
      });

      this.channelSubject = new BehaviorSubject(null);
      this.userSubject = new BehaviorSubject(null);
      
      this.auth.auth.signInAnonymously();

      this.auth.authState.subscribe((user) => {
         this.userSubject.next(user);
      });
   }

   goToChannel(channel: any) {
      this.channelSubject.next(channel);
   }
}

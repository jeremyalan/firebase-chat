import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AngularFireAuth } from 'angularfire2/auth';

import { HomePage } from '../pages/home/home';
import { ChannelPage } from '../pages/channel/channel';

@Component({
   templateUrl: 'app.html',
   providers: [AngularFireAuth]
})
export class MyApp {
   @ViewChild(Nav) nav: Nav;

   rootPage: any = HomePage;
   user: any;

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

         this.signIn();
      });
   }

   openChannel(channel: any) {
      this.nav.setRoot(ChannelPage, { channel });
   }

   private signIn() {
      this.auth.authState.subscribe((user) => {
         if (user == null) {
            return this.auth.auth.signInAnonymously();
         }

         this.user = user.uid;
      });
   }
}

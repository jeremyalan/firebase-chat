import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';
import { ChannelPage } from '../pages/channel/channel';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { ChannelComponent } from '../components/channel/channel';
import { AddChannelPage } from '../pages/add-channel/add-channel';
import { AddChannelButtonComponent } from '../components/add-channel-button/add-channel-button';
import { UserChannelsListComponent } from '../components/user-channels-list/user-channels-list';

export const firebaseConfig = {
   apiKey: "AIzaSyCbfzOGSZqKP-2k_uoN9glIjjXihXoLAg0",
   authDomain: "fir-chat-38d43.firebaseapp.com",
   databaseURL: "https://fir-chat-38d43.firebaseio.com",
   projectId: "fir-chat-38d43",
   storageBucket: "",
   messagingSenderId: "296144762871"
};

@NgModule({
  declarations: [
    MyApp,
    ChannelPage,
    ChannelComponent,
    AddChannelPage,
    AddChannelButtonComponent,
    UserChannelsListComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ChannelPage,
    AddChannelPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}

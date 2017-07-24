import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { BehaviorSubject } from "rxjs";
import { User } from "firebase/app";

/**
 * Generated class for the ChannelPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
   selector: 'page-channel',
   templateUrl: 'channel.html',
})
export class ChannelPage {

   channel$: BehaviorSubject<any>;
   user$: BehaviorSubject<User>;

   constructor(navParams: NavParams) {

      this.channel$ = navParams.get('channel');
      this.user$ = navParams.get('user');

   }
}

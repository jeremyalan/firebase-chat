import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from "angularfire2/database";
import { BehaviorSubject } from "rxjs";
import { User } from "firebase";

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

   constructor(private navParams: NavParams) {

      this.channel$ = navParams.get('channel');
      this.user$ = navParams.get('user');

   }
}

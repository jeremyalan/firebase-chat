import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

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

   channel: any;

   constructor(public navCtrl: NavController, public navParams: NavParams) {
      this.channel = navParams.get('channel');
   }
}

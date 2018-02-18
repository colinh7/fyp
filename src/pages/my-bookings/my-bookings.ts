import { MyCalendarPage } from './../my-calendar/my-calendar';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the MyBookingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-bookings',
  templateUrl: 'my-bookings.html',
})
export class MyBookingsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyBookingsPage');
  }

  myCalendarPage(){

    this.navCtrl.push(MyCalendarPage);

  }

}

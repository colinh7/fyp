import { NodeBookingPage } from './../node-booking/node-booking';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import * as moment from 'moment';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
@IonicPage()
@Component({
  selector: 'page-user-events',
  templateUrl: 'user-events.html',
})
export class UserEventsPage {
  minuteValues;
  event = { startTime: new Date().toISOString(), endTime: new Date().toISOString(), allDay: false };
  minDate = new Date().toISOString();
  eventOptions = [];
  overlap: boolean;

  constructor(public navCtrl: NavController, private navParams: NavParams, public viewCtrl: ViewController, public alert: AlertController) {
    let preselectedDate = moment(this.navParams.get('selectedDay')).format();
    this.event.startTime = preselectedDate;
    this.event.endTime = preselectedDate;
    this.eventOptions = navParams.get("eventTimes");
  }

  ionViewDidLoad(){
   this.overlap = false;
  }
  cancel() {
    this.viewCtrl.dismiss();
  }

  save() {
    try {

      //this.viewCtrl.dismiss(this.event);
      //console.log("yes");
      //console.log(this.eventOptions);
      //console.log("yes");

      if (this.eventOptions.length === 0) {
        this.viewCtrl.dismiss(this.event);
        console.log("yes");
      }
      else if (this.eventOptions.length != 0){
        console.log("not null");
        console.log(this.eventOptions);
        for (var i = 0; i < this.eventOptions.length; i++) { 
        if (this.event.startTime > this.eventOptions[i].startTime.toISOString()) {
          console.log("not allowed");
          this.overlap = true;
         
          
          //this.viewCtrl.dismiss();

      
        }
      }


      }
    }
    catch (error) {
      console.log(error);
    }
  }

}

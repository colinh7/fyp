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
  overlap: boolean = false;
  sameDate: boolean = true;
  greaterThan: boolean = false;
  equal: boolean = false;

  constructor(public navCtrl: NavController, private navParams: NavParams, public viewCtrl: ViewController, public alert: AlertController) {
    let preselectedDate = moment(this.navParams.get('selectedDay')).format();
    this.event.startTime = preselectedDate;
    this.event.endTime = preselectedDate;
    this.eventOptions = navParams.get("eventTimes");
  }

  ionViewDidLoad() {

  }
  cancel() {
    this.viewCtrl.dismiss();
  }



  save() {

    var start = this.event.startTime.split("T");
    var startFormat = start[0];

    var end = this.event.endTime.split("T");
    var endFormat = end[0];



    try {

      if (this.event.startTime > this.event.endTime) {
        this.greaterThan = true;
        console.log("greater");
      }
      else 
      if (this.event.startTime == this.event.endTime) {
        this.equal = true;
        console.log("greater");
      }
      else
        if (startFormat != endFormat) {
          console.log("it works");
          this.sameDate = false;
        }
        else if (this.eventOptions.length === 0) {
          this.viewCtrl.dismiss(this.event);

        }

        else if (this.eventOptions.length != 0) {
          console.log("not null");
          console.log(this.eventOptions);
          for (var i = 0; i < this.eventOptions.length; i++) {

            if (this.event.startTime < this.eventOptions[i].endTime.toISOString() && this.event.startTime > this.eventOptions[i].endTime.toISOString()) {
              console.log("not allowed");
              this.overlap = true;


              //this.viewCtrl.dismiss();


            }
            else if (this.event.endTime > this.eventOptions[i].startTime && this.event.endTime < this.eventOptions[i].endTime) {
              console.log("not allowed");
              this.overlap = true;


            }
            else {
              this.viewCtrl.dismiss(this.event);
            }
          }


        }

    }
    catch (error) {
      console.log(error);
    }


  }
}

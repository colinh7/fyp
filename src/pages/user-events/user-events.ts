import { Http } from '@angular/http';
import { NodeBookingPage } from './../node-booking/node-booking';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import * as moment from 'moment';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { AngularFireAuth } from 'angularfire2/auth';

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
  nodeAddress: any;
  chargerType: any;
  authState: any = null;
  nodeOwnerId: any;

  constructor(private afAuth: AngularFireAuth, public http: Http, public navCtrl: NavController, private navParams: NavParams, public viewCtrl: ViewController, public alert: AlertController) {
  
    let preselectedDate = moment(this.navParams.get('selectedDay')).format();
    this.event.startTime = preselectedDate;
    this.event.endTime = preselectedDate;
    this.eventOptions = navParams.get("eventTimes");
    this.nodeAddress = navParams.get("nodeAddress");
    this.chargerType = navParams.get("chargerType")
    this.nodeOwnerId = navParams.get("nodeOwnerId")
  

    this.afAuth.authState.subscribe((auth) => {
      this.authState = auth
    });




  }

  ionViewDidLoad() {
    console.log(this.nodeAddress);
  }
  cancel() {
    this.viewCtrl.dismiss();
  }



  save() {
    console.log(this.event.endTime);
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
          console.log("equal");
        }
        else
          if (startFormat != endFormat) {
            console.log("it works");
            this.sameDate = false;
          }
          else if (this.eventOptions.length == 0) {
            let booked = 1;
           
            if (booked == 1) {
              this.book();
              this.viewCtrl.dismiss(this.event);
              console.log("booked")
            }
          }


      for (var i = 0; i < this.eventOptions.length; i++) {

        if (this.event.startTime < this.eventOptions[i].endTime.toISOString() && this.event.endTime <= this.eventOptions[i].endTime.toISOString()) {
          console.log("not allowed");
          this.overlap = true;





        }
        else {
          let booked = 1;
          
          if (booked == 1) {
            this.book();
            this.viewCtrl.dismiss(this.event);
            console.log("booked")
          }
        }
      }


    }


    catch (error) {
      console.log(error);
    }


  }

  //let options: any = { "key": "create", "chargerType": this.chargerType, "address": this.nodeAddress, "userId": this.authState.uid, "startTime": this.event.startTime, "finishTime": this.event.endTime },
  //url: any = 'http://localhost:80/data_marker/nodeBooking.php';


  book() {
    console.log("booked");
    let options: any = { "key": "create", "chargerType": this.chargerType, "nodeOwnerId": this.nodeOwnerId },
    url: any = 'http://localhost:80/data_marker/test.php';

    this.http.post(url, JSON.stringify(options))
      .subscribe((data: any) => {


        console.log("jump " + this.authState.uid);
        console.log(this.nodeOwnerId + " nodeId")
      },
      (error: any) => {
        console.log("problem");

        let alert = this.alert.create({
          title: 'Error!',
          subTitle: 'Please ensure your device is connected to the internet.',
          buttons: ['OK']
        });

        alert.present();
      });

  }
}

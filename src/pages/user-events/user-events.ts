import { Http } from '@angular/http';
import { NodeBookingPage } from './../node-booking/node-booking';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import * as moment from 'moment';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { AngularFireAuth } from 'angularfire2/auth';
import { scheduleMicroTask } from '@angular/core/src/util';

@IonicPage()
@Component({
  selector: 'page-user-events',
  templateUrl: 'user-events.html',
})
export class UserEventsPage {

  title: any;
  minuteValues;
  event = { startTime: new Date().toISOString(), endTime: new Date().toISOString(), title: this.title, allDay: false };
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
  nodeId: any;
  userId: any;
  startTime: any;
  finishTime: any;

  constructor(private afAuth: AngularFireAuth, public http: Http, public navCtrl: NavController, private navParams: NavParams, public viewCtrl: ViewController, public alert: AlertController) {
  
    let preselectedDate = moment(this.navParams.get('selectedDay')).format();
    this.event.startTime = preselectedDate;
    this.event.endTime = preselectedDate;
    this.eventOptions = navParams.get("eventTimes");
    this.nodeAddress = navParams.get("nodeAddress");
    this.chargerType = navParams.get("chargerType");
    this.nodeOwnerId = navParams.get("nodeOwnerId");
    this.nodeAddress = navParams.get("nodeAddress");
    this.nodeId = navParams.get("nodeId");
    this.userId = navParams.get("userId");

    console.log("HEHEHEHEHEHEY");
    console.log(this.nodeAddress);
    console.log(this.nodeId);
    console.log("OWNER " + this.nodeOwnerId);
    console.log(this.userId);
    
   
 
   

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
              this.event.title = "Node Address: " + this.nodeAddress + ". User: " + this.userId + ". Charger Type: " + this.chargerType + ". From" + new Date(this.event.endTime).toISOString() + " to " + new Date(this.event.startTime).toISOString()
          
              this.viewCtrl.dismiss(this.event);
              console.log("booked")
            }
          }


      for (var i = 0; i < this.eventOptions.length; i++) {

        if (this.event.startTime <= this.eventOptions[i].endTime.toISOString() && this.event.endTime <= this.eventOptions[i].endTime.toISOString()) {
          console.log("not allowed");
          this.overlap = true;





        }
        else if (this.event.startTime >= this.eventOptions[i].endTime.toISOString() && this.event.endTime <= this.eventOptions[i].endTime.toISOString()) {
          console.log("not allowed");
          this.overlap = true;
        }
        else {
          let booked = 1;

          
          
          if (booked == 1) {
            this.book();
            this.title = "Node Address: " + this.nodeAddress + ". User: " + this.userId + ". Charger Type: " + this.chargerType + ". From" + new Date(this.event.endTime).toISOString() + " to " + new Date(this.event.startTime).toISOString()
            this.viewCtrl.dismiss(this.event);
            console.log("PRORORORPLEM")
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

this.startTime =  new Date(this.event.startTime).toISOString().slice(0,19).replace('T', ' ');    
this.finishTime =  new Date(this.event.endTime).toISOString().slice(0,19).replace('T', ' ');


    console.log("booked");
    let options: any = { "key": "create", "userId": this.userId, "nodeAddress": this.nodeAddress, "chargerType": this.chargerType,"nodeId": this.nodeId, "nodeOwnerId": this.nodeOwnerId, "startTime": this.startTime, "finishTime": this.finishTime},
    url: any = 'http://localhost:80/data_marker/nodeBooking.php';
console.log( new Date(this.event.startTime));
    this.http.post(url, JSON.stringify(options))
      .subscribe((data: any) => {
console.log("sent");

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

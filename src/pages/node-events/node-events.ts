import { Http } from '@angular/http';
import { NodeBookingPage } from './../node-booking/node-booking';
import { Component, NgZone } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import * as moment from 'moment';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { AngularFireAuth } from 'angularfire2/auth';
import { scheduleMicroTask } from '@angular/core/src/util';


@Component({
  selector: 'page-node-events',
  templateUrl: 'node-events.html',
})
export class NodeEventsPage {

  title: any;
  minuteValues;
  event = { startTime: new Date().toISOString(), endTime: new Date().toISOString(), title: this.title, allDay: false };
  minDate = new Date().toISOString();

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
  eventsStart = [];
  eventsFinish = [];
  costPer15Mins: any;
  totalCost: any;
  startHour: any;
  endHour: any;
  hoursAvailable =[];








  constructor(private ngZone: NgZone, private afAuth: AngularFireAuth, public http: Http, public navCtrl: NavController, private navParams: NavParams, public viewCtrl: ViewController, public alert: AlertController) {

    let preselectedDate = moment(this.navParams.get('selectedDay')).format();
    this.event.startTime = preselectedDate;
    this.event.endTime = preselectedDate;
    this.nodeAddress = navParams.get("nodeAddress");
    this.chargerType = navParams.get("chargerType");
    this.nodeOwnerId = navParams.get("nodeOwnerId");
    this.nodeId = navParams.get("nodeId");
    this.userId = navParams.get("userId");
    this.eventsStart = navParams.get("eventsStart");
    this.eventsFinish = navParams.get("eventsFinish");
    this.costPer15Mins = navParams.get("costPer15Mins");
    this.startHour = navParams.get("startHour");
    this.endHour = navParams.get("endHour");
    var i;
   

    var end = this.endHour ++;
    console.log(end);    


    while(this.startHour < end+1){

      this.hoursAvailable.push(this.startHour++);

      
    }

    for( i = 0 ; i<this.hoursAvailable.length; i++){
          
    console.log(this.hoursAvailable[i]);
         

  }





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





// Loop inside the Angular zone
  // so the UI DOES refresh after each setTimeout cycle
  processWithinAngularZone() {
   
    var a = 0;
    this.checkCost(a);
  }

  // Loop outside of the Angular zone
  // so the UI DOES NOT refresh after each setTimeout cycle
  processOutsideOfAngularZone() {
  
    
    this.ngZone.runOutsideAngular(() => {
      this.checkCost(() => {
        // reenter the Angular zone and display done
        this.ngZone.run(() => { console.log('Outside Done!'); });
      });
    });
  }



  checkCost(a) {


    
    var d1 = + new Date(this.event.startTime);
    var d2 = + new Date(this.event.endTime);
    var differenceMs = d2 - d1;
    var diffSeconds = Math.floor(differenceMs / 1000) ; // seconds=
    this.totalCost = Math.floor(diffSeconds /60)
    console.log(this.totalCost);
    
  



  }
  save() {



    this.http.get('http://localhost:80/data_marker/getNodeBookings.php?userId= ' + this.userId + '&nodeId=' + this.nodeId)
      .map(res => res.json())
      .subscribe(nodeBookings => {


        if (nodeBookings) {


          for (let eventData of nodeBookings) {



            var mysqlDateTimeStart = eventData.startTime.split(/[- :]/);

            // Apply each element to the Date function
            var javascriptDateTimeStart = new Date(mysqlDateTimeStart[0], mysqlDateTimeStart[1] - 1, mysqlDateTimeStart[2], mysqlDateTimeStart[3], mysqlDateTimeStart[4], mysqlDateTimeStart[5]);


            var mysqlDateTimefinish = eventData.finishTime.split(/[- :]/);

            // Apply each element to the Date function
            var javascriptDateTimefinish = new Date(mysqlDateTimefinish[0], mysqlDateTimefinish[1] - 1, mysqlDateTimefinish[2], mysqlDateTimefinish[3], mysqlDateTimefinish[4], mysqlDateTimefinish[5]);

            console.log(javascriptDateTimefinish);


            eventData.startTime = new Date(javascriptDateTimeStart);
            eventData.endTime = new Date(javascriptDateTimefinish);



            this.eventsStart.push(eventData.startTime);
            this.eventsFinish.push(eventData.endTime);




          }
        }
        if (nodeBookings == null) {
          console.log("problem");
        }


      });

    var start = this.event.startTime.split("T");
    var startFormat = start[0];

    var startTime = start[1].split(":");


    var end = this.event.endTime.split("T");
    var endFormat = end[0];





    try {


      if (this.event.startTime > this.event.endTime) {
        this.greaterThan = true;
        console.log("greater");
      }

      if (this.event.startTime == this.event.endTime) {
        this.equal = true;
        console.log("equal");
      }
      else {
        this.check();
        console.log("YEYEYEYEYYEYEAAH");

      }
      /*  if (startFormat != endFormat ) {
          console.log("it works");
          this.sameDate = false;
        }
    
    */
    }


    catch (error) {
      console.log(error);
    }


  }


  check() {



    if (this.eventsFinish.length == 0) {
      console.log("empty");
      this.book();

      this.viewCtrl.dismiss(this.event);


    }
    else {

      for (var i = 0; i < this.eventsFinish.length; i++) {

        if (this.event.startTime <= this.eventsFinish[i].toISOString() && this.event.endTime >= this.eventsFinish[i].toISOString()) {
          console.log("yo");
          this.overlap = true;
          break;




        }
        else if (this.event.startTime >= this.eventsFinish[i].toISOString() && this.event.endTime <= this.eventsFinish[i].toISOString()) {
          console.log("bop");
          this.overlap = true;
          break;
        }
        else {
          console.log("NOPROBLEM")
          this.book();
          this.title = "Node Address: " + this.nodeAddress + ". User: " + this.userId + ". Charger Type: " + this.chargerType + ". From" + new Date(this.event.endTime).toISOString() + " to " + new Date(this.event.startTime).toISOString()
          this.viewCtrl.dismiss(this.event);
          console.log("NOPROBLEM")

          break;


        }
      }
    }

  }



  book() {

    this.startTime = new Date(this.event.startTime).toISOString().slice(0, 19).replace('T', ' ');
    this.finishTime = new Date(this.event.endTime).toISOString().slice(0, 19).replace('T', ' ');


    console.log("booked");
    let options: any = { "key": "create", "userId": this.userId, "nodeAddress": this.nodeAddress, "chargerType": this.chargerType, "nodeId": this.nodeId, "nodeOwnerId": this.nodeOwnerId, "startTime": this.startTime, "finishTime": this.finishTime, "cost" : this.totalCost },
      url: any = 'http://localhost:80/data_marker/nodeBooking.php';

    this.http.post(url, JSON.stringify(options))
      .subscribe((data: any) => {
        console.log("sent");



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
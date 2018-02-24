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
  tooLong: any;








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
   


    while(this.startHour < end+1){

      this.hoursAvailable.push(this.startHour++);

      
    }

    for( i = 0 ; i<this.hoursAvailable.length; i++){
          

         

  }





    this.afAuth.authState.subscribe((auth) => {
      this.authState = auth
    });

















  }

  ionViewDidLoad() {

  }
  cancel() {
    this.viewCtrl.dismiss();
  }





// Loop inside the Angular zone
  // so the UI DOES refresh after each setTimeout cycle
  


  checkCost(a) {


    
    var d1 = + new Date(this.event.startTime);
    var d2 = + new Date(this.event.endTime);
    var differenceMs = d2 - d1;
    var diffSeconds = Math.floor(differenceMs / 1000) ; // seconds=
    this.totalCost = Math.floor(diffSeconds /60)
   
    
  



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

          


            eventData.startTime = new Date(javascriptDateTimeStart);
            eventData.endTime = new Date(javascriptDateTimefinish);



            this.eventsStart.push(eventData.startTime);
            this.eventsFinish.push(eventData.endTime);




          }
        }
       
      });

     
    var start = this.event.startTime.split("T");
    var startFormat: any = start[0];

    var startTime = start[1].split(":");


    var end = this.event.endTime.split("T");
    var endFormat: any = end[0];

    var startuf = startFormat.split("-")
    var enduf = endFormat.split("-")
    var startdt = startuf[1];
    var enddt = enduf[1];
    console.log("DIFFFERENCE:"+enddt + " " + startdt);
    console.log("DIFFFERENCE:"+endFormat + " " + startFormat);

if(enddt[0] - startdt[0] !== 0){

  this.sameDate = true;


}
else if(enddt[2]-startdt>1){

this.tooLong = true;


}

else{



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
        if (startFormat != endFormat ) {
          console.log("it works");
          this.sameDate = false;
        }
    
    
    }


    catch (error) {
      console.log(error);
    }
  }

  }


  check() {



    if (this.eventsFinish.length == 0) {
      console.log("empty");
      this.book();

      this.viewCtrl.dismiss();


    }
    else {
      var found: boolean = false;

      for (var i = 0; i < this.eventsFinish.length; i++) {

        console.log("EVENT:" + i + this.eventsFinish[i]);
        console.log("Eventnew: " + this.event.endTime)
        console.log("length" + this.eventsFinish.length);;

        if (new Date(this.event.startTime).toISOString() <= this.eventsStart[i].toISOString() && new Date(this.event.endTime).toISOString() >= this.eventsFinish[i].toISOString()) {
          console.log("yo");
          this.overlap = true;
          found = true;
          break
        }
        else if (new Date(this.event.startTime).toISOString() >= this.eventsStart[i].toISOString() && new Date(this.event.endTime).toISOString()<= this.eventsFinish[i].toISOString()) {
          console.log("bop");
          this.overlap = true;
          found = true;
          break;
       
        
        }
        else if (new Date(this.event.startTime).toISOString() <= this.eventsStart[i].toISOString() && new Date(this.event.endTime).toISOString()<= this.eventsFinish[i].toISOString()&& new Date(this.event.endTime).toISOString()>= this.eventsStart[i].toISOString()) {
          console.log("bo");
          this.overlap = true;
          found = true;
          break;
         
        }
        else if (new Date(this.event.startTime).toISOString() == this.eventsStart[i].toISOString() && new Date(this.event.endTime).toISOString() == this.eventsFinish[i].toISOString()) {
          console.log("yp");
          this.overlap = true;
          found = true;
          break;
          
         
        }

        


        }
          if (!found){
          console.log("NOPROBLEM")
          this.book();
          this.title =  "Node Address: " + this.nodeAddress + ". User: " + this.userId + ". Charger Type: " + this.chargerType + ". From" + new Date(this.event.endTime).toISOString() + " to " + new Date(this.event.startTime).toISOString()
          this.viewCtrl.dismiss();
          console.log("NOPROBLEM")
          
        
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
        console.log("STTART"+ this.event.startTime);



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
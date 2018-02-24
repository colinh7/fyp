import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NodeEventsPage } from './../node-events/node-events';
import { Http } from '@angular/http';
import { ModalController, AlertController } from 'ionic-angular';
import * as moment from 'moment';
import { CalendarComponent } from 'ionic2-calendar/calendar';
import { MonthViewComponent } from 'ionic2-calendar/monthview';
import { WeekViewComponent } from 'ionic2-calendar/weekview';
import { DayViewComponent } from 'ionic2-calendar/dayview';
import { Subscription } from 'rxjs/Subscription';
import {LoadingController} from 'ionic-angular';
import { Component } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';


/**
 * Generated class for the MyNodeCalendarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-my-node-calendar',
  templateUrl: 'my-node-calendar.html',
})
export class MyNodeCalendarPage {
  eventSource = [];
  viewTitle: string;
  selectedDay = new Date();
  isToday: boolean;
  startHour: any;
  endHour: any;
  nodeAddress: any;
  nodeId: any;
  chargerType: any;
  nodeOwnerId;
  calendar = {
    mode: 'month',
    currentDate: new Date(),
    startHour: 1,
    endHour: 24,
    step: 30,

  };
  userId: any;
  eventsStart = [];
  eventsFinish = [];
  costPer15Mins: any;
  
  constructor( private afAuth: AngularFireAuth, public loadingCtrl: LoadingController, public http: Http, public navParams: NavParams, navCtrl: NavController, private modalCtrl: ModalController, private alertCtrl: AlertController) {

    
      let loading = this.loadingCtrl.create({
        content: 'Loading Node Data...'
      });
    
      loading.present();
    
      setTimeout(() => {
        this.calendar.mode = 'week';
        
        
        
        loading.dismiss();

      }, 100);
    
    


    this.userId = navParams.get('param7');
  

    
    
    let events = this.eventSource;
    this.http.get('http://localhost:80/data_marker/myNodeBookings.php?userId=' + this.userId )
    .map(res => res.json())
    .subscribe(nodeBookings => {

      
      if (nodeBookings) {
       

        for (let eventData of nodeBookings) {

       
  



          var mysqlDateTimeStart = eventData.startTime.split(/[- :]/);

          // Apply each element to the Date function
          var javascriptDateTimeStart = new Date(mysqlDateTimeStart[0], mysqlDateTimeStart[1]-1, mysqlDateTimeStart[2], mysqlDateTimeStart[3], mysqlDateTimeStart[4], mysqlDateTimeStart[5]);


          var mysqlDateTimefinish = eventData.finishTime.split(/[- :]/);

          // Apply each element to the Date function
          var javascriptDateTimefinish = new Date(mysqlDateTimefinish[0], mysqlDateTimefinish[1]-1, mysqlDateTimefinish[2], mysqlDateTimefinish[3], mysqlDateTimefinish[4], mysqlDateTimefinish[5]);
          
          console.log(javascriptDateTimefinish);


        eventData.startTime = new Date(javascriptDateTimeStart);
        eventData.endTime = new Date(javascriptDateTimefinish);

        eventData.title ="Booking ID:" + eventData.bookingId +". Charge Point ID:"+ eventData.nodeId +".  \n ChargePoint Address:"+ eventData.nodeAddress + "\n Charger Type:"+ eventData.chargerType + "\nStart Time:"+eventData.startTime + "\nFinish Time:"+ eventData.finishTime ;
        console.log(eventData.title);

          if(eventData)
        this.eventSource.push(eventData);
        this.eventsStart.push(eventData.startTime);
        this.eventsFinish.push(eventData.endTime);
       
     
     
     
      }
    }
    else 
    return 0;
      if (nodeBookings == null) {
        console.log("problem");
      }
   

    });
    



    


  }
  ionViewDidLoad() {

 console.log("looOOOOAAAAAAAAAADED");
  }
  
 
  





  click(){
    var elem: HTMLElement = document.elementFromPoint(300, 200) as HTMLElement;
    elem.click();
  }



  

  onViewTitleChanged(title) {
    this.viewTitle = title;
  }

  onEventSelected(event) {
    let start = moment(event.startTime).format('LLLL');
    let end = moment(event.endTime).format('LLLL');

    let alert = this.alertCtrl.create({
      title: '' + event.title,
      subTitle: 'From: ' + start + '<br>To: ' + end,
      buttons: ['OK']
    })
    alert.present();
  }

  changeMode(mode) {
    this.calendar.mode = mode;
    console.log(this.calendar.mode)
  }



  onTimeSelected(ev) {
    this.selectedDay = ev.selectedTime;
  }

  today() {
    this.calendar.currentDate = new Date();
  }

  onCurrentDateChanged(event: Date) {
    var today = new Date();
    today.setHours(0, 0, 0, 0);
    event.setHours(0, 0, 0, 0);
    this.isToday = today.getTime() === event.getTime();
  }





} 
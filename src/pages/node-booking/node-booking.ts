import { Http } from '@angular/http';
import { Component } from '@angular/core';
import { NavController, ModalController, AlertController } from 'ionic-angular';
import * as moment from 'moment';
import { CalendarComponent } from 'ionic2-calendar/calendar';
import { MonthViewComponent } from 'ionic2-calendar/monthview';
import { WeekViewComponent } from 'ionic2-calendar/weekview';
import { DayViewComponent } from 'ionic2-calendar/dayview';
import { NavParams } from 'ionic-angular/navigation/nav-params';







@Component({
  selector: 'page-node-booking',
  templateUrl: 'node-booking.html'
})
export class NodeBookingPage {
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

  constructor(public http: Http, public navParams: NavParams, navCtrl: NavController, private modalCtrl: ModalController, private alertCtrl: AlertController) {


 

    
    //.map(res => res.json())
    //.subscribe(appMarkers => {

      //this.appMarkers = appMarkers;
      //console.log(this.appMarkers);
      //console.log("yo")

      //if (appMarkers == null) {
       // console.log("problem");
     // }
      //this.addAppMarkers(appMarkers);

   // });
    //});

    

    this.nodeAddress = navParams.get('param1');
    this.nodeId = navParams.get('param2');
    this.chargerType = navParams.get('param3');
    this.nodeOwnerId = navParams.get('param4');
    this.startHour = navParams.get('param5');
    this.endHour = navParams.get('param6');
    this.userId = navParams.get('param7');
    


    


  }
  ionViewDidLoad() {

    console.log(this.startHour)
    console.log(this.calendar.startHour)
    console.log(this.nodeAddress);
    console.log("OWNER " + this.nodeOwnerId);


  }

  click(){
    var elem: HTMLElement = document.elementFromPoint(300, 200) as HTMLElement;
    elem.click();
  }



  addEvent() {
  
    let modal = this.modalCtrl.create('UserEventsPage', { selectedDay: this.selectedDay, eventTimes: this.eventSource, nodeAddress: this.nodeAddress, chargerType: this.chargerType, nodeOwnerId: this.nodeOwnerId, nodeId: this.nodeId, userId: this.userId });
    console.log(this.nodeAddress)
    modal.present();
    modal.onDidDismiss(data => {
    
      if (data) {
        let eventData = data;

        eventData.startTime = new Date(data.startTime);
        eventData.endTime = new Date(data.endTime);

        let events = this.eventSource;
        events.push(eventData);
        this.eventSource = [];
        setTimeout(() => {
          this.eventSource = events;
          console.log(this.eventSource);
        });
      }
    });
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
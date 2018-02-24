import { MyNodeDetailsPage } from './../my-node-details/my-node-details';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MyNodeCalendarPage } from '../my-node-calendar/my-node-calendar';


/**
 * Generated class for the MyNodesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-nodes',
  templateUrl: 'my-nodes.html',
})


export class MyNodesPage {

  userId: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {

          this.userId =this.navParams.get("param7")



  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyNodesPage');
  }


  myNodeCalendarPage(){

    this.navCtrl.push(MyNodeCalendarPage, {
  
  
      param7: this.userId
   
    });
    console.log("hey")
  }


  myNodeDetailsPage(){

    this.navCtrl.push(MyNodeDetailsPage, {
  
  
      param7: this.userId

   
    });
    console.log("hey")
    

  }
  
}

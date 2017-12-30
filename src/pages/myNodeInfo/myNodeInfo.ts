import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';



@Component({
  selector: 'page-myNodeInfo',
  templateUrl: 'myNodeInfo.html',
})
export class myNodeInfoPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyNodeInfoPage');
  }

}

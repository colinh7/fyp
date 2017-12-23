import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { myAccountInfoPage } from '../myAccountInfo/myAccountInfo'

@Component({
  selector: 'page-myaccount',
  templateUrl: 'myaccount.html'
})
export class myAccountPage {

  constructor(public navCtrl: NavController) {

  }

  viewAccountInfo(){
    this.navCtrl.push(myAccountInfoPage)
  
  }
}
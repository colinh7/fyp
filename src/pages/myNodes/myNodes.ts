import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { myNodeInfoPage } from '../myNodeInfo/myNodeInfo'


@Component({
  selector: 'page-myNodes',
  templateUrl: 'myNodes.html',
})
export class myNodesPage {

  constructor(public navCtrl: NavController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyNodesPage');
  }
  

  viewMyNodeInfo(){
    this.navCtrl.push(myNodeInfoPage)
  
}

}

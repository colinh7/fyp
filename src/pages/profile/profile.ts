import { NodeBookingPage } from './../node-booking/node-booking';
import { LoginPage } from './../login/login';
import { AngularFireAuth } from 'angularfire2/auth';
import { Component } from '@angular/core';
import { NavController, IonicPage, NavParams } from 'ionic-angular';
import { myAccountInfoPage } from '../myAccountInfo/myAccountInfo'
import { myNodesPage } from '../myNodes/myNodes'
import { User } from '../../models/user';


@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
  entryComponents: [LoginPage]

})



export class ProfilePage {


  bookableNode
  bookableNodeId
  chargerType
  nodeOwnerId
  startTime = 0
  finishTime = 24

  constructor(public navCtrl: NavController, private afAuth: AngularFireAuth) {

  }

  viewAccountInfo() {
    this.navCtrl.push(myAccountInfoPage)

  }
  viewMyNodes() {
    this.navCtrl.push(myNodesPage)

  }

  logout() {
    this.afAuth.auth.signOut().then(() => {
      this.navCtrl.setRoot(LoginPage);



    });


  }

  nodeBooking() {

    this.navCtrl.push(NodeBookingPage, {

      param1: this.bookableNode,
      param2: this.bookableNodeId,
      param3: this.chargerType,
      param4: this.nodeOwnerId,
      param5: this.startTime,
      param6: this.finishTime,
      param7: 'ProfilePage'

    });


  

  }



}
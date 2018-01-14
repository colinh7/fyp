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

  constructor(public navCtrl: NavController, private afAuth: AngularFireAuth ) {

  }

  viewAccountInfo(){
    this.navCtrl.push(myAccountInfoPage)
  
  }
  viewMyNodes(){
    this.navCtrl.push(myNodesPage)
  
  }

  logout(){
    this.afAuth.auth.signOut().then(() => {
      this.navCtrl.setRoot(LoginPage);
    

  
    });

  
}
}
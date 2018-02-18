import { MyBookingsPage } from './../my-bookings/my-bookings';
import { MyProfilePage } from './../my-profile/my-profile';
import { MyNodesPage } from './../my-nodes/my-nodes';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  authState: any = null;

  constructor(private afAuth: AngularFireAuth,public navCtrl: NavController, public navParams: NavParams) {


    this.afAuth.authState.subscribe((auth) => {
      this.authState = auth
    });


  }


  

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }



myBookingsPage(){

  this.navCtrl.push(MyBookingsPage, {

  
    param7: this.afAuth.auth.currentUser.uid,
 
  
  });
}

myNodesPage(){

  this.navCtrl.push(MyNodesPage, {


    param7: this.afAuth.auth.currentUser.uid,
 
  });
  console.log("hey")
}

myProfilePage(){

  this.navCtrl.push(MyProfilePage, {

    param7: this.afAuth.auth.currentUser.uid,
 
  });



}


}
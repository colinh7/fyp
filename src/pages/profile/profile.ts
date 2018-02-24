import { MyCalendarPage } from './../my-calendar/my-calendar';
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


@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  authState: any = null;
  userId: any;
  nodeAddress: any; 
  nodeId: any;
  chargerType: any; 
  nodeOwnerId: any; 
  startHour: any; 
  endHour: any; 

  constructor(private afAuth: AngularFireAuth,public navCtrl: NavController, public navParams: NavParams) {


    this.afAuth.authState.subscribe((auth) => {
      this.authState = auth
    });

    this.userId = this.afAuth.auth.currentUser;

    
    this.http.get('http://localhost:80/data_marker/myNodeData.php?userId='+this.userId)
    .map(res => res.json())
    .subscribe(appMarkers => {


      this.nodeAddress = appMarkers.nodeAddress;
      this.nodeId = appMarkers.nodeId;
      this.chargerType = appMarkers.chargerType;
      this.nodeOwnerId = appMarkers.nodeOwnerId;
      this.startHour = appMarkers.startHour;
      this.endHour = appMarkers.endHour;
  
      console.log(this.startHour+ "STARTTHOUR");
      

      if (appMarkers == null) {
        console.log("problem");
      }
      

    });




  }


  

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }



myBookingsPage(){

  this.navCtrl.push(MyCalendarPage, {

  
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
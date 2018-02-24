import { MyNodeCalendarPage } from './../my-node-calendar/my-node-calendar';
import { Http } from '@angular/http';
import { MyCalendarPage } from './../my-calendar/my-calendar';
import { MyProfilePage } from './../my-profile/my-profile';
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
  firstName: any;
  lastName: any;
  emailAddress: any;
  phoneNumber: any;
  uuid:any;
  costPer15Mins: any

  constructor(public http: Http, private afAuth: AngularFireAuth,public navCtrl: NavController, public navParams: NavParams) {


    this.afAuth.authState.subscribe((auth) => {
      this.authState = auth
    });

    this.userId = this.afAuth.auth.currentUser.uid;



    this.http.get('http://localhost:80/data_marker/myNodeData.php?userId='+this.userId)
    .map(res => res.json())
    .subscribe(appMarkers => {

      this.setMarkerVariables(appMarkers);
      
   

    });




console.log(this.endHour + "ENDHOUR");

    this.http.get('http://localhost:80/data_marker/myProfile.php?userId='+this.userId)
    .map(res => res.json())
    .subscribe(u => {

   
    this.setUserVariables(u);
     
  
      console.log(this.startHour+ "STARTTHOUR");
      

      if (u == null) {
        console.log("problem");
      }
      

    });





  

  }


  

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }




  setMarkerVariables(appMarkers){

    for(let appMarker of appMarkers){

      try{

      this.nodeAddress = appMarker.nodeAddress;
      this.nodeId = appMarker.nodeId;
      this.chargerType = appMarker.chargerType;
      this.nodeOwnerId = appMarker.nodeOwnerId;
      this.startHour = appMarker.startTime;
      this.endHour = appMarker.finishTime;
      this.costPer15Mins = appMarker.costPer15Mins;
  
      console.log(this.startHour+ "STARTTHOUR");
      
      }catch( error){

      }

  }
}

  setUserVariables(user){

    for(let u of user){

      try{

        this.firstName = u.firstName;
        this.lastName = u.lastName;
        this.emailAddress = u.emailAddress;
        this.phoneNumber = u.phoneNumber;
        this.uuid = u.uuid;
  
      console.log(this.startHour+ "STARTTHOUR");
      
      }catch( error){

      }

  }
}




myBookingsPage(){

  this.navCtrl.push(MyCalendarPage, {

  
    param7: this.afAuth.auth.currentUser.uid,
 
  
  });
}

pushPage(){

  this.navCtrl.push(MyNodeCalendarPage, {


    param7: this.afAuth.auth.currentUser.uid,
 
  });
  console.log("hey")
}

myProfilePage(){

  this.navCtrl.push(MyProfilePage, {

    param7: this.afAuth.auth.currentUser.uid,
    nodeAddress:this.nodeAddress,
    nodeId:this.nodeId ,
    chargerType:this.chargerType ,
    nodeOwnerId:this.nodeOwnerId ,
    startHour:this.startHour,
    endHour:this.endHour ,
    firstName:this.firstName ,
    lastName: this.lastName ,
    emailAddress:this.emailAddress ,
    phoneNumber:this.phoneNumber,
    costPer15Mins: this.costPer15Mins
   
    
  });



}


}
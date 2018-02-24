import { EditNodeDetailsPage } from './../edit-node-details/edit-node-details';
import { Http } from '@angular/http';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';

/**
 * Generated class for the MyProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-profile',
  templateUrl: 'my-profile.html',
})
export class MyProfilePage {

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
  uuid: any;
  costPer15Mins: any;

  constructor(private afAuth: AngularFireAuth, public http: Http, public navCtrl: NavController, public navParams: NavParams) {

    

    this.userId = navParams.get("param7");
    console.log(this.userId)


    
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





console.log(this.costPer15Mins+"COOOOST");

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyProfilePage');
  }

  edit(){
    this.navCtrl.push(EditNodeDetailsPage,{


      param7: this.userId,
      nodeAddress:this.nodeAddress,
      nodeId:this.nodeId ,
      chargerType:this.chargerType ,
      nodeOwnerId:this.nodeOwnerId ,
      startHour:this.startHour,
      endHour:this.endHour ,
      firstName:this.firstName ,
      lastName: this.lastName ,
      emailAddress:this.emailAddress ,
      phoneNumber:this.phoneNumber
     


    });
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





}
